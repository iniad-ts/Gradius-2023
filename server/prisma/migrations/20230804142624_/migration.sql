-- CreateTable
CREATE TABLE "Enemy" (
    "id" TEXT NOT NULL,
    "pos" JSONB NOT NULL,
    "speed" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "radius" INTEGER NOT NULL,

    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("id")
);
