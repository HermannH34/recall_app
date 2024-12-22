'use server'

import Recall from "@/models/Recall";
import connectMongo from "@/libs/mongoose";
import { revalidatePath } from 'next/cache';

export async function toggleRecall(recallId: string) {
  try {
    await connectMongo();

    const deletedRecall = await Recall.findOneAndDelete({ _id: recallId });
    revalidatePath('/recalls');

    return { success: true, data: deletedRecall }
  } catch (error) {

    return { success: false, error: 'Failed to update recall status' }
  }
}

export async function updateComment(recallId: string, comment: string) {
  try {
    await connectMongo();
    
    const result = await Recall.findByIdAndUpdate(
        recallId,
        { $set: { comment: comment }  }, 
        { new: true, runValidators: true } 
      );

    console.log("test" ,result)
    revalidatePath('/recalls');

    return { success: true, data: result.toJSON() };
  } catch (error) {
    console.error('Error updating comment:', error);
    return { success: false, error: 'Failed to update comment' };
  }
} 