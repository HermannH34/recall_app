'use server'

import FollowUp from "@/models/ProspectFollowUp"
import connectMongo from "@/libs/mongoose"
import { revalidatePath } from 'next/cache'

interface FollowUpData {
  name: string
  email: string
  interlocutor: string
}

export async function createFollowUp(data: FollowUpData) {
  try {
    await connectMongo()

    const newFollowUp = new FollowUp({
      name: data.name,
      email: data.email,
      interlocutor: data.interlocutor,
      createdAt: new Date(),
    })

    await newFollowUp.save()
    revalidatePath('/followup')

    return { success: true, data: newFollowUp.toJSON() }
  } catch (error) {
    console.error('Failed to create follow-up:', error)
    return { success: false, error: 'Failed to create follow-up' }
  }
}
