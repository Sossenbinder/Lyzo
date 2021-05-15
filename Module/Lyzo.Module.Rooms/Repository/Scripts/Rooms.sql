CREATE TABLE "Rooms" (
	"Id" UUID NOT NULL PRIMARY KEY,
	"Name" VARCHAR(256) NOT NULL,
	"Description" VARCHAR(1024) NOT NULL,
	"CreationDate" timestamp NOT NULL
);