"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("../generated/prisma/client");
const BCRYPT_ROUNDS = 12;
function required(name) {
    const value = process.env[name];
    if (!value)
        throw new Error(`Missing required env var: ${name}`);
    return value;
}
async function main() {
    const accounts = [
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
    const adapter = new adapter_pg_1.PrismaPg({ connectionString: required('DATABASE_URL') });
    const prisma = new client_1.PrismaClient({ adapter });
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
        console.log('\nDone. Keep SIGNUP_ENABLED unset in production so no one else can register.');
    }
    finally {
        await prisma.$disconnect();
    }
}
main().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed-accounts.js.map