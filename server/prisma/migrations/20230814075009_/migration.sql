/*
  Warnings:

  - Changed the type of `direction` on the `Bullet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bullet" DROP COLUMN "direction",
ADD COLUMN     "direction" JSONB NOT NULL;
