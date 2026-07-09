import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { env } from '../config/env';
import * as schema from '../schema';

const sqlite = new Database(env.DATABASE_URL);
// Enable foreign keys for SQLite
sqlite.pragma('foreign_keys = ON');

export const db = drizzle(sqlite, { schema });
