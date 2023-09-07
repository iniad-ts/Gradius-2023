/*
  Warnings:

  - You are about to drop the column `power` on the `Bullet` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Bullet` table. All the data in the column will be lost.
  - You are about to drop the column `vector` on the `Bullet` table. All the data in the column will be lost.
  - You are about to drop the column `pos` on the `Enemy` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Enemy` table. All the data in the column will be lost.
  - You are about to drop the column `vector` on the `Enemy` table. All the data in the column will be lost.
  - You are about to drop the column `pos` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `vector` on the `Player` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Bullet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdPos` to the `Bullet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direction` to the `Bullet` table without a default value. This is not possible if the table is not empty.
  - Made the column `shooterId` on table `Bullet` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `createdAt` to the `Enemy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdPos` to the `Enemy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direction` to the `Enemy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bullet" DROP COLUMN "power",
DROP COLUMN "type",
DROP COLUMN "vector",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdPos" JSONB NOT NULL,
ADD COLUMN     "direction" JSONB NOT NULL,
ALTER COLUMN "shooterId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Enemy" DROP COLUMN "pos",
DROP COLUMN "score",
DROP COLUMN "vector",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdPos" JSONB NOT NULL,
ADD COLUMN     "direction" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "pos",
DROP COLUMN "vector",
ADD COLUMN     "x" INTEGER NOT NULL,
ADD COLUMN     "y" INTEGER NOT NULL;
