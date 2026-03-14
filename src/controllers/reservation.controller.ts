import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { cancelReservation, createReservation, createReservationSchema, listUserReservations } from '../services/reservation.service';
import { z } from 'zod';

export const handleCreateReservation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const data = createReservationSchema.parse(req.body);
    const reservation = await createReservation(userId, data);
    res.status(201).json(reservation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: (error as any).errors });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const handleListUserReservations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const reservations = await listUserReservations(userId);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const handleCancelReservation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const reservationId = req.params.id as string;
    await cancelReservation(userId, reservationId);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
