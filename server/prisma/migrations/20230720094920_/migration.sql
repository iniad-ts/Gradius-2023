/*
  Warnings:

  - You are about to drop the column `tekix` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `tekiy` on the `game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "game" DROP COLUMN "tekix",
DROP COLUMN "tekiy";
