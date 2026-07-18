/**
 * Seed / reset the fixed set of accounts.
 *
 * Public sign-up is disabled in production (SIGNUP_ENABLED unset), so this is
 * how the owner + demo accounts get created. Safe to re-run: it upserts by
 * email, so running it again just resets the password/display name.
 *
 * Usage:
 *   cd apps/api
 *   pnpm seed:accounts
 *
 * Reads credentials from env (see .env):
 *   SEED_USER_EMAIL / SEED_USER_PASSWORD / SEED_USER_NAME
 *   SEED_DEMO_EMAIL / SEED_DEMO_PASSWORD / SEED_DEMO_NAME
 */
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma/client';

const BCRYPT_ROUNDS = 12;

type SeedAccount = { email: string; password: string; displayName: string };

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

async function main(): Promise<void> {
  const accounts: SeedAccount[] = [
    {
      email: required('SEED_USER_EMAIL'),
      password: required('SEED_USER_PASSWORD'),
      displayName: process.env.SEED_USER_NAME ?? 'Owner',
    },
    {
      email: required('SEED_DEMO_EMAIL'),
      password: required('SEED_DEMO_PASSWORD'),
      displayName: process.env.SEED_DEMO_NAME ?? 'HuntKit Demo',
    },
  ];

  const adapter = new PrismaPg({ connectionString: required('DATABASE_URL') });
  const prisma = new PrismaClient({ adapter });

  try {
    for (const acc of accounts) {
      const email = acc.email.toLowerCase();
      const password_hash = await bcrypt.hash(acc.password, BCRYPT_ROUNDS);
      const user = await prisma.users.upsert({
        where: { email },
        update: {
          password_hash,
          display_name: acc.displayName,
          updated_at: new Date(),
        },
        create: { email, password_hash, display_name: acc.displayName },
      });
      console.log(`✓ Seeded ${user.email} (${user.id})`);
    }
    console.log(
      '\nDone. Keep SIGNUP_ENABLED unset in production so no one else can register.',
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
