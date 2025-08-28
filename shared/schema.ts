import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const content = pgTable("content", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'game', 'movie', 'series'
  year: text("year"),
  rating: text("rating"),
  description: text("description"),
  poster: text("poster"),
  background: text("background"),
  metadata: json("metadata"), // additional info like platform, director, etc.
  categories: json("categories"), // characters, weapons, locations, etc.
  trending: integer("trending").default(0),
  featured: integer("featured").default(0),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey(),
  contentId: varchar("content_id").references(() => content.id),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'characters', 'weapons', 'locations', etc.
  data: json("data").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContentSchema = createInsertSchema(content).omit({
  id: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Content = typeof content.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
