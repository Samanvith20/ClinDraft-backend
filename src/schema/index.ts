import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const patients = sqliteTable('patients', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  dateOfBirth: text('date_of_birth').notNull(),
  gender: text('gender').notNull(),
  mrn: text('mrn').notNull().unique(), // Medical Record Number
  context: text('context', { mode: 'json' }), // Single Source of Truth for Clinical Data
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});


export const drafts = sqliteTable('drafts', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  patientId: text('patient_id').notNull().references(() => patients.id),
  content: text('content').notNull(),
  draftType: text('draft_type').notNull(), // e.g., consultation_note, discharge_summary
  status: text('status').notNull().default('in_progress'), // in_progress, completed
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const chatMessages = sqliteTable('chat_messages', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  patientId: text('patient_id').notNull().references(() => patients.id),
  role: text('role').notNull(), // user, agent
  content: text('content').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});
