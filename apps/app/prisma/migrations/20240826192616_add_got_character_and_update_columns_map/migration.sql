/*
  Warnings:

  - You are about to drop the `auth_access_tokens` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `created_at` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `n5e_characters` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `worlds` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `worlds_characters` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "auth_access_tokens" DROP CONSTRAINT "auth_access_tokens_tokenable_id_foreign";

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "n5e_characters" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "world_organizations" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "worlds" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "worlds_characters" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "auth_access_tokens";

-- CreateTable
CREATE TABLE "got_characters" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "gender" VARCHAR(255) NOT NULL DEFAULT '',
    "house" VARCHAR(255) NOT NULL DEFAULT '',
    "age" INTEGER NOT NULL DEFAULT 0,
    "abilities" JSONB NOT NULL DEFAULT '{"agility":{"rating":2,"specialties":[]},"animalHandling":{"rating":2,"specialties":[]},"athletics":{"rating":2,"specialties":[]},"awareness":{"rating":2,"specialties":[]},"cunning":{"rating":2,"specialties":[]},"endurance":{"rating":2,"specialties":[]},"fighting":{"rating":2,"specialties":[]},"healing":{"rating":2,"specialties":[]},"language":{"rating":2,"specialties":[]},"knowledge":{"rating":2,"specialties":[]},"marksmanship":{"rating":2,"specialties":[]},"persuasion":{"rating":2,"specialties":[]},"status":{"rating":2,"specialties":[]},"stealth":{"rating":2,"specialties":[]},"survival":{"rating":2,"specialties":[]},"thievery":{"rating":2,"specialties":[]},"warfare":{"rating":2,"specialties":[]},"will":{"rating":2,"specialties":[]}}',

    CONSTRAINT "got_characters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "got_characters" ADD CONSTRAINT "got_characters_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
