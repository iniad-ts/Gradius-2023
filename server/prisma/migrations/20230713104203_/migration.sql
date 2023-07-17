/*
  Warnings:

  - Added the required column `score` to the `Enemy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enemy" ADD COLUMN     "score" INTEGER NOT NULL;
