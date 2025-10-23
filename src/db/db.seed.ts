import { db } from "./db";
import { productsTable, salesTable } from "./schema";

export async function seed() {
  console.log("🌱 Seeding database...");

  // Insert products
  await db.insert(productsTable).values([
    { name: "Laptop", category: "Electronics", price: "999.99" },
    { name: "Mouse", category: "Electronics", price: "25.99" },
    { name: "Keyboard", category: "Electronics", price: "75.00" },
    { name: "Monitor", category: "Electronics", price: "299.99" },
    { name: "Desk Chair", category: "Furniture", price: "199.99" },
    { name: "Desk", category: "Furniture", price: "399.99" },
    { name: "Notebook", category: "Stationery", price: "5.99" },
    { name: "Pen Set", category: "Stationery", price: "12.99" },
  ]);

  // Insert sales
  await db.insert(salesTable).values([
    {
      productId: 1,
      quantity: 2,
      total_amount: 1999.98,
      customer_name: "John Doe",
      region: "North",
    },
    {
      productId: 2,
      quantity: 5,
      total_amount: 129.95,
      customer_name: "Jane Smith",
      region: "South",
    },
    {
      productId: 3,
      quantity: 3,
      total_amount: 225.0,
      customer_name: "Bob Johnson",
      region: "East",
    },
    {
      productId: 1,
      quantity: 1,
      total_amount: 999.99,
      customer_name: "Alice Brown",
      region: "West",
    },
    {
      productId: 4,
      quantity: 2,
      total_amount: 599.98,
      customer_name: "Charlie Wilson",
      region: "North",
    },
    {
      productId: 5,
      quantity: 4,
      total_amount: 799.96,
      customer_name: "Diana Davis",
      region: "South",
    },
    {
      productId: 6,
      quantity: 1,
      total_amount: 399.99,
      customer_name: "Eve Martinez",
      region: "East",
    },
    {
      productId: 7,
      quantity: 20,
      total_amount: 119.8,
      customer_name: "Frank Lee",
      region: "West",
    },
    {
      productId: 8,
      quantity: 10,
      total_amount: 129.9,
      customer_name: "Grace Kim",
      region: "North",
    },
    {
      productId: 2,
      quantity: 3,
      total_amount: 77.97,
      customer_name: "Henry Chen",
      region: "South",
    },
    {
      productId: 3,
      quantity: 2,
      total_amount: 150.0,
      customer_name: "Ivy Wang",
      region: "East",
    },
    {
      productId: 1,
      quantity: 1,
      total_amount: 999.99,
      customer_name: "Jack Taylor",
      region: "West",
    },
  ]);

  console.log("✅ Database seeded successfully!");
}

seed();
