import { sql } from "drizzle-orm";
import { integer, real } from "drizzle-orm/sqlite-core";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const productsTable = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: text("price").notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

// sales table

export const salesTable = sqliteTable("sales", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("productId")
    .notNull()
    .references(() => productsTable.id),
  quantity: integer("quantity").notNull(),
  total_amount: real("total_amount").notNull(),
  sale_date: text("sale_date").default(sql`CURRENT_TIMESTAMP`),
  customer_name: text("customer_name").notNull(),
  region: text("region").notNull(),
});
