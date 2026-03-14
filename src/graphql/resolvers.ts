import { loginUser, registerUser } from '../services/auth.service';
import { createRoom, listRooms } from '../services/room.service';
import { cancelReservation, createReservation, listUserReservations } from '../services/reservation.service';
import { prisma } from '../utils/prisma';
import { GraphQLError } from 'graphql';

const getUserId = (context: any) => {
  if (!context.user) throw new GraphQLError('Not authenticated');
  return context.user.userId;
};

export const resolvers = {
  Query: {
    rooms: async () => listRooms(),
    myReservations: async (_: any, __: any, context: any) => {
      const userId = getUserId(context);
      return listUserReservations(userId);
    },
    me: async (_: any, __: any, context: any) => {
      const userId = getUserId(context);
      return prisma.user.findUnique({ where: { id: userId } });
    }
  },
  Mutation: {
    register: async (_: any, args: any) => registerUser(args),
    login: async (_: any, args: any) => loginUser(args),
    createRoom: async (_: any, args: any, context: any) => {
      getUserId(context);
      return createRoom(args);
    },
    createReservation: async (_: any, args: any, context: any) => {
      const userId = getUserId(context);
      return createReservation(userId, args);
    },
    cancelReservation: async (_: any, { reservationId }: { reservationId: string }, context: any) => {
      const userId = getUserId(context);
      await cancelReservation(userId, reservationId);
      return true;
    }
  }
};
