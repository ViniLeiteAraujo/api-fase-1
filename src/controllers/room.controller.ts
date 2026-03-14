import { Request, Response } from 'express';
import { createRoom, createRoomSchema, listRooms } from '../services/room.service';
import { z } from 'zod';


export const handleCreateRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = createRoomSchema.parse(req.body);
    const room = await createRoom(data);
    res.status(201).json(room);
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

export const handleListRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await listRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
