CREATE TYPE "user_type" AS ENUM('donor', 'volunteer');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "profilePicture" DROP NOT NULL;