import { prisma } from '../utils/prisma';
import { z } from 'zod';

export const createReservationSchema = z.object({
  roomId: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
});

export const createReservation = async (userId: string, data: z.infer<typeof createReservationSchema>) => {
  const room = await prisma.room.findUnique({ where: { id: data.roomId } });
  if (!room) {
    throw new Error('Room not found');
  }

  const conflicting = await prisma.reservation.findFirst({
    where: {
      roomId: data.roomId,
      date: data.date,

      OR: [
        {
          startTime: { lte: data.startTime },
          endTime: { gt: data.startTime }
        },
        {
          startTime: { lt: data.endTime },
          endTime: { gte: data.endTime }
        }
      ]
    }
  });

  if (conflicting) {
    throw new Error('Room is already reserved for this time');
  }

  return prisma.reservation.create({
    data: {
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      user: { connect: { id: userId } },
      room: { connect: { id: data.roomId } }
    },
    include: { room: true }
  });
};

export const listUserReservations = async (userId: string) => {
  return prisma.reservation.findMany({
    where: { userId },
    include: { room: true }
  });
};

export const cancelReservation = async (userId: string, reservationId: string) => {
  const reservation = await prisma.reservation.findUnique({ where: { id: reservationId } });
  if (!reservation) {
    throw new Error('Reservation not found');
  }
  if (reservation.userId !== userId) {
    throw new Error('Not authorized to cancel this reservation');
  }

  return prisma.reservation.delete({ where: { id: reservationId } });
};
