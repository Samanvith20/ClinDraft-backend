import { db } from '../db';
import { drafts, chatMessages } from '../schema';
import { eq } from 'drizzle-orm';
import { NewDraft, Draft, NewChatMessage, ChatMessage } from '../types';

export class DraftRepository {
  async findAll(): Promise<Draft[]> {
    return db.select().from(drafts);
  }

  async findByPatientId(patientId: string): Promise<Draft[]> {
    return db.select().from(drafts).where(eq(drafts.patientId, patientId));
  }

  async create(draftData: NewDraft): Promise<Draft> {
    const result = await db.insert(drafts).values(draftData).returning();
    return result[0];
  }

  async update(id: string, content: string): Promise<Draft | undefined> {
    const result = await db.update(drafts)
      .set({ content, updatedAt: new Date().toISOString() })
      .where(eq(drafts.id, id))
      .returning();
    return result[0];
  }
}

export class ChatRepository {
  async getMessagesByPatientId(patientId: string): Promise<ChatMessage[]> {
    return db.select().from(chatMessages).where(eq(chatMessages.patientId, patientId));
  }

  async create(messageData: NewChatMessage): Promise<ChatMessage> {
    const result = await db.insert(chatMessages).values(messageData).returning();
    return result[0];
  }
}
