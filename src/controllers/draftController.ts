import { Request, Response, NextFunction } from 'express';
import { DraftService } from '../services/draftService';
import { draftSchema } from '../validators';

const draftService = new DraftService();

export class DraftController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = draftSchema.parse(req.body);
      const newDraft = await draftService.createDraft(validatedData);
      res.status(201).json({ data: newDraft });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const updatedDraft = await draftService.updateDraft(id, content);
      
      if (!updatedDraft) {
        return res.status(404).json({ error: 'Draft not found' });
      }
      
      res.json({ data: updatedDraft });
    } catch (error) {
      next(error);
    }
  }
}
