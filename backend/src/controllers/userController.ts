import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const toggleSaveCollege = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { collegeId } = req.body;

    if (!collegeId) {
      return res.status(400).json({ error: 'College ID is required' });
    }

    const existing = await prisma.savedCollege.findUnique({
      where: { userId_collegeId: { userId, collegeId } },
    });

    if (existing) {
      await prisma.savedCollege.delete({
        where: { userId_collegeId: { userId, collegeId } },
      });
      return res.json({ saved: false });
    } else {
      await prisma.savedCollege.create({
        data: { userId, collegeId },
      });
      return res.json({ saved: true });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
