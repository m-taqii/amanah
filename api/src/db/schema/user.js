import { integer, pgTable, timestamp, varchar, pgEnum, boolean } from "drizzle-orm/pg-core";

const userType = pgEnum("user_type", ["donor", "volunteer"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull().unique(),
  address: varchar({ length: 255 }).notNull(),
  role: userType("role").notNull().default("donor"),
  profilePicture: varchar({ length: 255 }).notNull(),
  isVerified: boolean().default(false),
  isBlocked: boolean().default(false),
  
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
