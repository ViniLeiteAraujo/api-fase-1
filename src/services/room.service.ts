import { prisma } from '../utils/prisma';
import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string().min(3),
  capacity: z.number().int().positive(),
});

export const createRoom = async (data: z.infer<typeof createRoomSchema>) => {
  const existingRoom = await prisma.room.findUnique({ where: { name: data.name } });
  if (existingRoom) {
    throw new Error('Room already exists');
  }

  return prisma.room.create({
    data: {
      name: data.name,
      capacity: data.capacity,
    },
  });
};

export const listRooms = async () => {
  return prisma.room.findMany();
};
