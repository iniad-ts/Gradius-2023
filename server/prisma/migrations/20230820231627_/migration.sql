-- CreateTable
CREATE TABLE "Bullet" (
    "bulletId" TEXT NOT NULL,
    "pos" JSONB NOT NULL,
    "power" INTEGER NOT NULL,
    "vector" JSONB NOT NULL,
    "type" INTEGER NOT NULL,
    "side" TEXT NOT NULL,
    "shooterId" TEXT,

    CONSTRAINT "Bullet_pkey" PRIMARY KEY ("bulletId")
);
