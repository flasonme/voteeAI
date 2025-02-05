import { Request, Response } from 'express';
import { WordleService } from '../services/wordle.service';

export class WordleController {
  private wordleService: WordleService;

  constructor() {
    this.wordleService = new WordleService();
  }

  solveDaily = async (req: Request, res: Response) => {
    try {
      const size = Number(req.query.size ?? 5);
      const wordles = await this.wordleService.solveDaily(size);
      res.status(200).json(wordles);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
} 