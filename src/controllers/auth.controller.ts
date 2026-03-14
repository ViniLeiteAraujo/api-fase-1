import { Request, Response } from 'express';
import { loginSchema, loginUser, registerSchema, registerUser } from '../services/auth.service';
import { z } from 'zod';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await registerUser(data);
    res.status(201).json(result);
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

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await loginUser(data);
    res.status(200).json(result);
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
