import { Router, Request, Response } from 'express';
import WordleRoutes from './wordle.routes';

const router = Router();

router.use('/wordle', WordleRoutes);

export { router }; 