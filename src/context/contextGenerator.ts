import { PatientRepository } from '../repositories/patientRepository';
import { DerivedPatientContext } from '../types';

export class ContextGenerator {
  private patientRepo: PatientRepository;

  constructor() {
    this.patientRepo = new PatientRepository();
  }


  async generateContext(patientId: string): Promise<DerivedPatientContext | null> {
    const patient = await this.patientRepo.findById(patientId);
    if (!patient) return null;

    // Calculate age
    const dob = new Date(patient.dateOfBirth);
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    const patientOneLiner = `${age}-year-old ${patient.gender}.`;

    const defaultContext = {
      patientOneLiner,
      activeProblems: [],
      currentMedications: [],
      allergies: [],
      relevantObservations: [],
      riskFlags: [],
      missingInformation: [],
      evidenceReferences: [],
    };

    if (patient.context) {
      return { ...defaultContext, ...(patient.context as any) };
    }

    return defaultContext;
  }
}
