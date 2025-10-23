import { db } from "@/db/db";
import { createGroq } from "@ai-sdk/groq";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import { log } from "console";
import { Yaldevi } from "next/font/google";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});
export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const SYSTEM_PROMPT = `You are a Sql assistant that helps users to query their database using natural language.

  ${new Date().toLocaleString("sv-SE")}
   You have access to following tools:
  
   1.db tool- Call this tool to query the database.
   2.schema tool- Call this tool to get the schema of the database, which will help you to generate SQL queries.

   Rules:
   -Generate only SELECT queries(no INSERT, UPDATE, DELETE, DROP)

   Always use the schema provided by the schema tool
   
   -Pass in valid SQL synatax in db tool
   -IMPORTANT: To query database call db tool,Dont return just sql query.

   alwys respond in a helpful, conversational tone while being technically accurate.
  `;

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: convertToModelMessages(messages),
    system: SYSTEM_PROMPT,
    stopWhen: stepCountIs(5),
    tools: {
      schema: tool({
        description: "Call this tool to query a database",
        inputSchema: z.object({
          query: z.string().describe("The SQL query to be ran"),
        }),
        execute: async ({ query }) => {
          console.log("Query", query);
          return `CREATE TABLE products (
	id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	name text NOT NULL,
	category text NOT NULL,
	price text NOT NULL,
	createdAt text DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales (
	id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	productId integer NOT NULL,
	quantity integer NOT NULL,
	total_amount real NOT NULL,
	sale_date text DEFAULT CURRENT_TIMESTAMP,
	customer_name text NOT NULL,
	region text NOT NULL,
	FOREIGN KEY (productId) REFERENCES products(id) ON UPDATE no action ON DELETE no action
)`;
        },
      }),
      db: tool({
        description: "Call this tool to get database schema information",
        inputSchema: z.object({
          query: z.string().describe("The SQL query to be ran"),
        }),
        execute: async ({ query }) => {
          console.log(" Query", query);
          //Important : Make sure you sanitize/validate (somehow) check the query
          //string search[delete, update] ->Guardrails
          return await db.run(query);
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
