import { Router } from 'express';
import { DraftController } from '../controllers/draftController';

export const draftRoutes = Router();
const draftController = new DraftController();

draftRoutes.post('/', draftController.create.bind(draftController));
draftRoutes.put('/:id', draftController.update.bind(draftController));
