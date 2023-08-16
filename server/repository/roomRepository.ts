import type { RoomModel } from '$/commonTypesWithClient/models';
import { UserIdParser, roomIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Room } from '@prisma/client';

const toRoomModel = (prismaRoom: Room): RoomModel => ({
  roomId: roomIdParser.parse(prismaRoom.roomId),
  roomName: prismaRoom.roomName,
  status: prismaRoom.status,
  id1p: UserIdParser.parse(prismaRoom.id1p),
  id2p: UserIdParser.parse(prismaRoom.id2p),
  position1p: prismaRoom.position1p,
  position2p: prismaRoom.position2p,
  bullet: prismaRoom.bullet,
  enemy: prismaRoom.enemy,
  background: prismaRoom.background,
  screen: prismaRoom.screen,
  created: prismaRoom.createdAt,
});
export const roomsRepository = {
  save: async (room: RoomModel) => {
    console.log('セーブしています');
    await prismaClient.room.upsert({
      where: { roomId: room.roomId },
      update: {
        status: room.status,
        id1p: room.id1p,
        id2p: room.id2p,
        position1p: room.position1p,
        position2p: room.position2p,
        bullet: room.bullet,
        enemy: room.enemy,
        background: room.background,
        screen: room.screen,
        createdAt: room.created,
      },
      create: {
        roomId: room.roomId,
        roomName: room.roomName,
        status: room.status,
        id1p: room.id1p,
        id2p: room.id2p,
        position1p: room.position1p,
        position2p: room.position2p,
        bullet: room.bullet,
        enemy: room.enemy,
        background: room.background,
        screen: room.screen,
        createdAt: room.created,
      },
    });
  },
  findLatest: async (): Promise<RoomModel[] | null> => {
    const rooms = await prismaClient.room.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rooms.length > 0 ? rooms.map((room) => toRoomModel(room)) : null;
  },
};
