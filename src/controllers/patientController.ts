import { Request, Response, NextFunction } from 'express';
import { PatientService } from '../services/patientService';
import { DraftService } from '../services/draftService';
import { patientSchema } from '../validators';

const patientService = new PatientService();
const draftService = new DraftService();

export class PatientController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const patients = await patientService.getAllPatients();
      res.json({ data: patients });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const patient = await patientService.getPatientById(id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.json({ data: patient });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = patientSchema.parse(req.body);
      const newPatient = await patientService.createPatient(validatedData);
      res.status(201).json({ data: newPatient });
    } catch (error) {
      next(error);
    }
  }

  async getContext(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const context = await patientService.getPatientContext(id);
      if (!context) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.json({ data: context });
    } catch (error) {
      next(error);
    }
  }

  async getDrafts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const drafts = await draftService.getDraftsByPatientId(id);
      res.json({ data: drafts });
    } catch (error) {
      next(error);
    }
  }
  async updateContext(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const contextData = req.body; // Expects full context object
      const updatedContext = await patientService.updatePatientContext(id, contextData);
      res.json({ data: updatedContext });
    } catch (error) {
      next(error);
    }
  }
}
