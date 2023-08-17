-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomId" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "id1p" TEXT NOT NULL,
    "id2p" TEXT NOT NULL,
    "position1p" INTEGER[],
    "position2p" INTEGER[],
    "bullet" TEXT NOT NULL,
    "enemy" TEXT NOT NULL,
    "background" INTEGER[],
    "screen" INTEGER NOT NULL,
    "createdAt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserOnRoom" (
    "firebaseId" TEXT NOT NULL,
    "in" TIMESTAMP(3) NOT NULL,
    "out" TIMESTAMP(3),
    "roomId" TEXT NOT NULL,

    CONSTRAINT "UserOnRoom_pkey" PRIMARY KEY ("firebaseId","roomId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomId_key" ON "Room"("roomId");

-- AddForeignKey
ALTER TABLE "UserOnRoom" ADD CONSTRAINT "UserOnRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
