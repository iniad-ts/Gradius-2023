import type { RoomModel } from '$/commonTypesWithClient/models';
import { roomsRepository } from '$/repository/roomRepository';
import { UserIdParser, roomIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

export const roomUsecase = {
  create: async (
    roomName: RoomModel['roomName'],
    screen: RoomModel['screen'],
    id1p: RoomModel['id1p']
  ) => {
    const newRoom: RoomModel = {
      roomId: roomIdParser.parse(randomUUID()),
      roomName,
      status: 'waiting',
      id1p,
      id2p: UserIdParser.parse(''),
      position1p: [0, 0],
      position2p: [80, 80],
      bullet: '0',
      enemy: '0',
      background: [0, 0, 0],
      screen,
      created: String(Date.now()),
    };
    console.log('作っています');
    await roomsRepository.save(newRoom);
    console.log('返す');
    return newRoom;
  },
};
