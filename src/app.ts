import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import roomRoutes from './routes/room.routes';
import reservationRoutes from './routes/reservation.routes';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
