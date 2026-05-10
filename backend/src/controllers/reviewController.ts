import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment, collegeId, userId } = req.body;

    if (!rating || !comment || !collegeId || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const review = await prisma.review.upsert({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
      update: {
        rating,
        comment,
      },
      create: {
        rating,
        comment,
        userId,
        collegeId,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
