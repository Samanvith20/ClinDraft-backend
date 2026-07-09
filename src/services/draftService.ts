import { DraftRepository } from '../repositories/draftRepository';
import { NewDraft, Draft } from '../types';

export class DraftService {
  private draftRepo: DraftRepository;

  constructor() {
    this.draftRepo = new DraftRepository();
  }

  async getAllDrafts(): Promise<Draft[]> {
    return this.draftRepo.findAll();
  }

  async getDraftsByPatientId(patientId: string): Promise<Draft[]> {
    return this.draftRepo.findByPatientId(patientId);
  }

  async createDraft(data: NewDraft): Promise<Draft> {
    return this.draftRepo.create(data);
  }

  async updateDraft(id: string, content: string): Promise<Draft | undefined> {
    return this.draftRepo.update(id, content);
  }
}
