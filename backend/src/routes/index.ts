import { Router } from 'express';
import { getColleges, getCollegeById } from '../controllers/collegeController';
import { createReview } from '../controllers/reviewController';
import { register, login, getProfile } from '../controllers/authController';
import { toggleSaveCollege } from '../controllers/userController';
import { authenticate } from '../middlewares/auth';
import { getQuestions, createQuestion, createAnswer } from '../controllers/questionController';


const router = Router();

// Public Routes
router.get('/colleges', getColleges);
router.get('/colleges/:id', getCollegeById);
router.post('/auth/register', register);
router.post('/auth/login', login);

// Protected Routes
router.get('/auth/profile', authenticate, getProfile);
router.post('/colleges/save', authenticate, toggleSaveCollege);
router.post('/reviews', authenticate, createReview);

router.get('/questions', getQuestions);
router.post('/questions', authenticate, createQuestion);
router.post('/answers', authenticate, createAnswer);

export default router;
