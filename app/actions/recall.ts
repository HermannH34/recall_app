'use server'

import Recall from "@/models/Recall";
import connectMongo from "@/libs/mongoose";
import { revalidatePath } from 'next/cache';

export async function toggleRecall(recallId: string) {
  try {
    await connectMongo();

    const deletedRecall = await Recall.findOneAndDelete({ _id: recallId });
    revalidatePath('/');

    return { success: true, data: deletedRecall }
  } catch (error) {
    console.error('Error toggling recall:', error)
    return { success: false, error: 'Failed to update recall status' }
  }
} 