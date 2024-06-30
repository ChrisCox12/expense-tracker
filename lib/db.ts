import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// Hack to avoid intitlizing PrismaClient over and over due to Next.js hot-reloading
export const db = globalThis.prisma || new PrismaClient();

// If not in production, then don't initialize multiple times
if(process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}