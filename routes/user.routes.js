import { Router } from 'express';
import upload from '../middlewares/upload.middleware.js';
import { updateProfileImage } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.put(
  '/profile-image/:id', // user-id
  authMiddleware,
  upload.single('image'),
  updateProfileImage
);

export default router;