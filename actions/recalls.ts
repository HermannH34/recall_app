'use server'

import Recall from "@/models/Recall";
import connectMongo from "@/libs/mongoose";
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function toggleRecall(recallId: string, request: NextRequest) {
  try {
    await connectMongo();

    const deletedRecall = await Recall.findOneAndDelete({ _id: recallId });
    const path = request.nextUrl.pathname; // Get current path from the request
    revalidatePath(path); 

    return { success: true, data: deletedRecall }
  } catch (error) {

    return { success: false, error: 'Failed to update recall status' }
  }
}

export async function updateComment(recallId: string, comment: string, request: NextRequest) {
  try {
    await connectMongo();
    
    const result = await Recall.findByIdAndUpdate(
        recallId,
        { $set: { comment: comment }  }, 
        { new: true, runValidators: true } 
      );

      const path = request.nextUrl.pathname; // Get current path from the request
      revalidatePath(path); 

    return { success: true, data: result.toJSON() };
  } catch (error) {
    console.error('Error updating comment:', error);
    return { success: false, error: 'Failed to update comment' };
  }
} 