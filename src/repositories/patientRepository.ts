import { db } from '../db';
import { patients } from '../schema';
import { eq } from 'drizzle-orm';
import { NewPatient, Patient } from '../types';

import { v4 as uuidv4 } from 'uuid';

export class PatientRepository {
  async findAll(): Promise<Patient[]> {
    return db.select().from(patients);
  }

  async findById(id: string): Promise<Patient | undefined> {
    const result = await db.select().from(patients).where(eq(patients.id, id));
    return result[0];
  }

  async create(patientData: NewPatient): Promise<Patient> {
    const result = await db.insert(patients).values(patientData).returning();
    return result[0];
  }

  async updateContext(id: string, contextData: any): Promise<any> {
    // Generate UUIDs for any new items in arrays
    const arraysToProcess = ['activeProblems', 'currentMedications', 'allergies', 'relevantObservations'];
    for (const arrName of arraysToProcess) {
      if (Array.isArray(contextData[arrName])) {
        contextData[arrName] = contextData[arrName].map((item: any) => {
          if (!item.id) {
            return { ...item, id: uuidv4() };
          }
          return item;
        });
      }
    }
    
    // Ensure contextData is serialized properly if sqlite needs it, 
    // but Drizzle { mode: 'json' } handles serialization automatically.
    const result = await db.update(patients)
      .set({ context: contextData })
      .where(eq(patients.id, id))
      .returning();
    
    return result[0]?.context;
  }
}
