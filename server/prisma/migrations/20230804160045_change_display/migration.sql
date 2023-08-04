/*
  Warnings:

  - You are about to drop the column `displayNumber` on the `Game` table. All the data in the column will be lost.
  - Added the required column `displays` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "displayNumber",
ADD COLUMN     "displays" JSONB NOT NULL;
