/*
  Warnings:

  - Added the required column `isPlaying` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "isPlaying" BOOLEAN NOT NULL;
