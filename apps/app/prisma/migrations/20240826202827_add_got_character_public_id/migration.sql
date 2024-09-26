/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `got_characters` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `public_id` to the `got_characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "got_characters" ADD COLUMN     "public_id" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "got_characters_public_id_unique" ON "got_characters"("public_id");
