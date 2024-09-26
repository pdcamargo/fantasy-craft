-- AlterTable
ALTER TABLE "n5e_characters" ADD COLUMN     "cp" JSONB NOT NULL DEFAULT '{"flatBonus": 0, "perLevelBonus": 0}',
ADD COLUMN     "hp" JSONB NOT NULL DEFAULT '{"flatBonus": 0, "perLevelBonus": 0}';
