import { Router } from 'express';
import { PatientController } from '../controllers/patientController';

export const patientRoutes = Router();
const patientController = new PatientController();

patientRoutes.get('/', patientController.getAll.bind(patientController));
patientRoutes.post('/', patientController.create.bind(patientController));
patientRoutes.get('/:id', patientController.getById.bind(patientController));
patientRoutes.get('/:id/context', patientController.getContext.bind(patientController));
patientRoutes.put('/:id/context', patientController.updateContext.bind(patientController));
patientRoutes.get('/:id/drafts', patientController.getDrafts.bind(patientController));
