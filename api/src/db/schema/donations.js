import { integer, pgTable, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";

export const donationStatusEnum = pgEnum("donation_status", ["available", "claimed", "expired"]);

export const donationTable = pgTable("donations", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull(),
    imageUrl: varchar({ length: 255 }).notNull(),
    title: varchar({ length: 255 }).notNull(),
    amount: integer().notNull(),
    collectBy: timestamp().notNull(),
    notes: varchar({ length: 255 }),
    status: donationStatusEnum().notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
});