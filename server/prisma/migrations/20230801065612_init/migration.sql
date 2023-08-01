/*
  Warnings:

  - You are about to drop the column `gameId` on the `Bullet` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Enemy` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Player` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bullet" DROP CONSTRAINT "Bullet_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Enemy" DROP CONSTRAINT "Enemy_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_gameId_fkey";

-- AlterTable
ALTER TABLE "Bullet" DROP COLUMN "gameId";

-- AlterTable
ALTER TABLE "Enemy" DROP COLUMN "gameId";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "gameId";
