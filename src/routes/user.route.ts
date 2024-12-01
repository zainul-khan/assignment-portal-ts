import express from 'express';
import { register, login, uploadAssignment } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth';
const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.post('/upload', authenticate, uploadAssignment);

export default router;
