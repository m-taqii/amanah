CREATE TABLE "donations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "donations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"imageUrl" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"collectBy" timestamp NOT NULL,
	"notes" varchar(255),
	"status" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
