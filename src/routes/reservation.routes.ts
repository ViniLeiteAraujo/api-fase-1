import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { handleCancelReservation, handleCreateReservation, handleListUserReservations } from '../controllers/reservation.controller';

const router = Router();

router.use(authenticate);

router.post('/', handleCreateReservation);
router.get('/my', handleListUserReservations);
router.delete('/:id', handleCancelReservation);

export default router;
