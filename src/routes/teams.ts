import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = express.Router();
const prisma = new PrismaClient();

// Create team
router.post('/', auth, async (req: AuthRequest, res) => {
  try {
    const { name, memberIds } = req.body;
    const team = await prisma.team.create({
      data: {
        name,
        memberIds
      }
    });
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

// Get all teams
router.get('/', auth, async (req: AuthRequest, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// Add member to team
router.post('/:id/members', auth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    const team = await prisma.team.update({
      where: { id },
      data: {
        memberIds: {
          push: userId
        }
      }
    });
    res.json(team);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add team member' });
  }
});

export default router;