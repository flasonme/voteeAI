import { Router } from 'express';
import { WordleController } from '../controllers/wordle.controller';

const router = Router();
const wordleController = new WordleController();

router.get('/solve', wordleController.solveDaily);

export default router; 