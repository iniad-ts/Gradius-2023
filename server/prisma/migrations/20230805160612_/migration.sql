-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enemy" (
    "id" TEXT NOT NULL,
    "pos" JSONB NOT NULL,
    "speed" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "radius" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Player"(
    "userId" TEXT NOT NULL,
    "pos" JSONB NOT NULL,
    "speed" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "radius" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Plyer_pkey" PRIMARY KEY ("userId")
)

-- CreateTable
CREATE TABLE "Bullet"(
    "bulletId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "pos" JSONB NOT NULL,
    "attack" INTEGER NOT NULL,
)