/*
  Warnings:

  - Made the column `user_id` on table `worlds` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "worlds" ALTER COLUMN "user_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "worlds_characters" (
    "id" SERIAL NOT NULL,
    "world_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "worlds_characters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "worlds_characters" ADD CONSTRAINT "worlds_characters_world_id_foreign" FOREIGN KEY ("world_id") REFERENCES "worlds"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
