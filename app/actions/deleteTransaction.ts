"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


async function deleteTransaction(transationId: string): Promise<{ message?: string; error?: string }> {
    const { userId } = auth();

    if(!userId) {
        return { error: "User not found" };
    }

    try {
        await db.transaction.delete({ 
            where: { id: transationId, userId } 
        });

        revalidatePath('/');

        return { message: "Transaction deleted" };
    } catch (error) {
        return { error: "Database error" };
    }
}


export default deleteTransaction;