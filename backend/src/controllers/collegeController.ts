import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getColleges = async (req: Request, res: Response) => {
  try {
    const { search, location, minRating, maxFees } = req.query;

    const where: any = {};

    if (search) {
      where.name = {
        contains: search as string,
        mode: 'insensitive',
      };
    }

    if (location) {
      where.location = {
        contains: location as string,
        mode: 'insensitive',
      };
    }

    if (minRating) {
      where.overallRating = {
        gte: parseFloat(minRating as string),
      };
    }

    if (req.query.course) {
      where.courses = {
        some: {
          courseName: { contains: req.query.course as string, mode: "insensitive" },
        },
      };
    }

    const colleges = await prisma.college.findMany({
      where,
      include: {
        courses: true,
      },
    });

    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCollegeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const college = await prisma.college.findUnique({
      where: { id: id as string },
      include: {
        courses: true,
        reviews: {
          include: { user: { select: { name: true, avatarUrl: true } } },
        },
        questions: {
          include: {
            answers: { include: { author: { select: { name: true } } } },
          },
        },
      },
    });

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
