import { pool } from '../db.js';
import { User } from '../Model/User.js';

const findByEmail = async (email: string): Promise<User | undefined> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (result.rows.length === 0) {
    return undefined;
  }

  const row = result.rows[0];

  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role
  };
};

const create = async (email: string, passwordHash: string, role: 'student' | 'teacher' = 'student'): Promise<User> => {
  const result = await pool.query(
    'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *',
    [email, passwordHash, role]
  );

  const row = result.rows[0];

  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role
  };
};

export const UserRepository = {
  findByEmail,
  create
};