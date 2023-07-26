import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { UserIdParser, gameIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Player } from '@prisma/client';
import { z } from 'zod';

const toPlayerModel = (prismaPlayer: Player): PlayerModel => ({
  id: UserIdParser.parse(prismaPlayer.id),
  name: prismaPlayer.name,
  createdAt: prismaPlayer.createdAt.getTime(),
  updateAt: prismaPlayer.updatedAt.getTime(),
  position: {
    x: prismaPlayer.posX,
    y: prismaPlayer.posY,
  },
  health: z.number().min(0).parse(prismaPlayer.health),
  speed: z.number().min(0).parse(prismaPlayer.speed),
  radius: z.number().min(0).parse(prismaPlayer.radius),
  score: z.number().min(0).parse(prismaPlayer.score),
  gameId: gameIdParser.parse(prismaPlayer.gameId),
});

export type PlayerStatus = {
  health: number;
  score: number;
};

export const playersRepository = {
  getAll: async (): Promise<PlayerModel[] | null> => {
    const prismaPlayers = await prismaClient.player.findMany();

    return prismaPlayers.map(toPlayerModel);
  },
  getUnique: async (id: UserId): Promise<PlayerModel | null> => {
    const prismaPlayer = await prismaClient.player.findUnique({
      where: { id },
    });

    return prismaPlayer !== null ? toPlayerModel(prismaPlayer) : null;
  },
  save: async (player: PlayerModel) => {
    await prismaClient.player.upsert({
      where: { id: player.id },
      update: {
        name: player.name,
        posX: player.position.x,
        posY: player.position.y,
        health: player.health,
        score: player.score,
        updatedAt: new Date(player.updateAt),
      },
      create: {
        id: player.id,
        name: player.name,
        posX: player.position.x,
        posY: player.position.y,
        health: player.health,
        speed: player.speed,
        radius: player.radius,
        score: player.score,
        createdAt: new Date(player.createdAt),
        updatedAt: new Date(player.updateAt),
        gameId: player.gameId,
      },
    });
  },
  delete: async (id: UserId) => {
    await prismaClient.player.delete({
      where: { id },
    });
  },
};
