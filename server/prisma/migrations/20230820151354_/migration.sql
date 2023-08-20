/*
  Warnings:

  - Added the required column `pos` to the `Enemy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pos` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enemy" ADD COLUMN     "pos" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "pos" JSONB NOT NULL;
