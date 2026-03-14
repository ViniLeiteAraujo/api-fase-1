import { prisma } from '../utils/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerUser = async (data: z.infer<typeof registerSchema>) => {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id);
  return { user: { id: user.id, name: user.name, email: user.email }, token };
};

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id);
  return { user: { id: user.id, name: user.name, email: user.email }, token };
};
