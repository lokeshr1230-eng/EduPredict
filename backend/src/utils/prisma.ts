import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

dotenv.config();

  // 1. Create a standard PostgreSQL connection pool
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

  // 2. Wrap it in Prisma's adapter
const adapter = new PrismaPg(pool);

  // 3. Pass the adapterB to the Prisma Client
const prisma = new PrismaClient({ adapter });

export default prisma;