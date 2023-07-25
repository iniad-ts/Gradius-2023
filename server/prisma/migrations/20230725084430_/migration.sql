/*
  Warnings:

  - Added the required column `radius` to the `Bullet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `radius` to the `Enemy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `radius` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bullet" ADD COLUMN     "radius" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Enemy" ADD COLUMN     "radius" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "radius" INTEGER NOT NULL,
ADD COLUMN     "speed" INTEGER NOT NULL;
