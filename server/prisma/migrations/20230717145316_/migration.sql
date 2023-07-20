/*
  Warnings:

  - The primary key for the `game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `firebaseId` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game" DROP CONSTRAINT "game_pkey",
ADD COLUMN     "firebaseId" TEXT NOT NULL,
ADD CONSTRAINT "game_pkey" PRIMARY KEY ("firebaseId");
