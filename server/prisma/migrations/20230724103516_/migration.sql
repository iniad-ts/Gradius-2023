-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gameId" TEXT NOT NULL,
    "posX" INTEGER NOT NULL,
    "posY" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bullet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gameId" TEXT NOT NULL,
    "direction" INTEGER NOT NULL,
    "crearedPosX" INTEGER NOT NULL,
    "crearedPosY" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "exists" BOOLEAN NOT NULL,
    "playerId" TEXT,

    CONSTRAINT "Bullet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enemy" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gameId" TEXT NOT NULL,
    "posX" INTEGER NOT NULL,
    "posY" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "direction" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bullet" ADD CONSTRAINT "Bullet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enemy" ADD CONSTRAINT "Enemy_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
