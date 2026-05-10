import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/auth';

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { name: true } },
        answers: { include: { author: { select: { name: true } } } },
      },
    });
    res.json(questions);
  } catch { res.status(500).json({ error: 'Internal server error' }); }
};

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const authorId = (req as AuthRequest).user!.id;
    const question = await prisma.question.create({
      data: { title, content, tags: tags || [], authorId },
      include: { author: { select: { name: true } }, answers: true },
    });
    res.status(201).json(question);
  } catch { res.status(500).json({ error: 'Internal server error' }); }
};

export const createAnswer = async (req: Request, res: Response) => {
  try {
    const { content, questionId } = req.body;
    const authorId = (req as AuthRequest).user!.id;
    const answer = await prisma.answer.create({
      data: { content, questionId, authorId },
      include: { author: { select: { name: true } } },
    });
    res.status(201).json(answer);
  } catch { res.status(500).json({ error: 'Internal server error' }); }
};