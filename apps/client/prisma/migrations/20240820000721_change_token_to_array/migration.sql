/*
  Warnings:

  - The `abilities` column on the `auth_access_tokens` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "auth_access_tokens" DROP COLUMN "abilities",
ADD COLUMN     "abilities" TEXT[] DEFAULT ARRAY[]::TEXT[];
