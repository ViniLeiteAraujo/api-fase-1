import { Router } from 'express';
import { handleCreateRoom, handleListRooms } from '../controllers/room.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.post('/', authenticate, handleCreateRoom);
router.get('/', handleListRooms);

export default router;
