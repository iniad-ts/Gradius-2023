/*
  Warnings:

  - Added the required column `tekix` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tekiy` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game" ADD COLUMN     "tekix" INTEGER NOT NULL,
ADD COLUMN     "tekiy" INTEGER NOT NULL;
