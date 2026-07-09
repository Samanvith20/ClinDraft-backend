import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import * as schema from '../schema';

export type Patient = InferSelectModel<typeof schema.patients>;
export type NewPatient = InferInsertModel<typeof schema.patients>;

export type Draft = InferSelectModel<typeof schema.drafts>;
export type NewDraft = InferInsertModel<typeof schema.drafts>;

export type ChatMessage = InferSelectModel<typeof schema.chatMessages>;
export type NewChatMessage = InferInsertModel<typeof schema.chatMessages>;

export interface DerivedPatientContext {
  patientOneLiner: string;
  activeProblems: any[];
  currentMedications: any[];
  allergies: any[];
  relevantObservations: any[];
  riskFlags: string[];
  missingInformation: string[];
  evidenceReferences: any[];
}
