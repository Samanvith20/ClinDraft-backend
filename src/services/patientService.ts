import { PatientRepository } from '../repositories/patientRepository';
import { ContextGenerator } from '../context/contextGenerator';
import { NewPatient, Patient, DerivedPatientContext } from '../types';

export class PatientService {
  private patientRepo: PatientRepository;
  private contextGen: ContextGenerator;

  constructor() {
    this.patientRepo = new PatientRepository();
    this.contextGen = new ContextGenerator();
  }

  async getAllPatients(): Promise<Patient[]> {
    return this.patientRepo.findAll();
  }

  async getPatientById(id: string): Promise<Patient | undefined> {
    return this.patientRepo.findById(id);
  }

  async createPatient(data: NewPatient): Promise<Patient> {
    return this.patientRepo.create(data);
  }

  async getPatientContext(id: string): Promise<DerivedPatientContext | null> {
    return this.contextGen.generateContext(id);
  }
  async updatePatientContext(id: string, contextData: any): Promise<any> {
    return this.patientRepo.updateContext(id, contextData);
  }
}
