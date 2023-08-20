-- CreateTable
CREATE TABLE "Player" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "vector" JSONB NOT NULL,
    "Item" JSONB,
    "side" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Enemy" (
    "enemyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "vector" JSONB NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("enemyId")
);
