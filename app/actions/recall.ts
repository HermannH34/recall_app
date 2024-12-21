'use server'

import Recall from "@/models/Recall";
import connectMongo from "@/libs/mongoose";

export async function toggleRecall(recallId: string, wasRecalled: boolean) {
  try {
    await connectMongo();

    const updatedRecall = await Recall.updateOne(
      { _id: recallId },
      { $set: { wasRecalled: true } }
    )

    return { success: true, data: updatedRecall }
  } catch (error) {
    console.error('Error toggling recall:', error)
    return { success: false, error: 'Failed to update recall status' }
  }
} 