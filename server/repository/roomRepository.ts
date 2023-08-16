import type { RoomModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
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
};
