import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema/user.js";

export async function createUser(user) {
  return await db.insert(usersTable).values(user).returning();
}

export async function findUserByEmail(email) {
  return await db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function findUserByPhone(phone) {
  return await db.select().from(usersTable).where(eq(usersTable.phone, phone));
}

export async function updateIsVerified(email, isVerified) {
  return await db.update(usersTable).set({ isVerified }).where(eq(usersTable.email, email)).returning();
}

export async function updateIsBlocked(email, isBlocked) {
  return await db.update(usersTable).set({ isBlocked }).where(eq(usersTable.email, email)).returning();
}

export async function findUserById(id) {
  return await db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function findAllUsers() {
  return await db.select().from(usersTable);
}

export async function updateUser(id, user) {
  return await db.update(usersTable).set(user).where(eq(usersTable.id, id)).returning();
}
