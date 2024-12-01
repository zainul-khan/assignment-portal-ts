import express from 'express';
import { getAssignments, acceptAssignment, rejectAssignment } from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth';
const router = express.Router()

router.get('/assignments', authenticate, getAssignments);
router.put('/assignments/:id/accept', authenticate, acceptAssignment);
router.put('/assignments/:id/reject', authenticate, rejectAssignment);

export default router;
