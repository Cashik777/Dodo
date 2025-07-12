import { Request, Response } from 'express';
import { Casino } from '../../models/Casino';
import { cache } from '../../services/cache';

export const getCasinos = async (req: Request, res: Response) => {
  try {
    const cachedData = await cache.get('casinos');
    
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const casinos = await Casino.find()
      .sort({ rating: -1 })
      .limit(10);

    // Кэшируем на 1 час
    await cache.set('casinos', JSON.stringify(casinos), 'EX', 3600);

    res.json(casinos);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
