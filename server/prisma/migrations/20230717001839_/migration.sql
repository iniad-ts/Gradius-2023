-- CreateTable
CREATE TABLE "game" (
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "board" JSONB NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("board")
);
