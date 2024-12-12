import mongoose, { Schema, Document, Model } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

// MongoDB connection URI
const MONGO_URI = 'your_mongodb_connection_string_here';

// Interface for user document
interface IUser extends Document {
  email: string;
  name: string;
  motive: string;
  frecallDate: Date;
}

// MongoDB connection helper
const connectToDatabase = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Mongoose schema for user
const userSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  motive: { type: String, required: true },
  recallDate: { type: Date, required: true },
});

// Mongoose model for user
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

const getFormattedDate = (): Date => {
  const isWeekend = (day: number): boolean => day === 6 || day === 0;
  const isFridayOrThursday = (day: number): boolean => day >= 4;

  let newDate = new Date();
  newDate.setDate(newDate.getDate() + 2)

  while (isWeekend(newDate.getDay()) || isFridayOrThursday(newDate.getDay())) {
    newDate.setDate(newDate.getDate() + 1);
  }

  return newDate;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name, motive } = req.body;

  if (!email || !name || !motive) {
    return res.status(400).json({ message: 'Email, name, and motive are required' });
  }

  try {
    const recallDate = getFormattedDate();

    const userData = new Recall({
      email,
      name,
      motive,
      recallDate,
    });

    await userData.save();

    res.status(201).json({
      message: 'Data saved successfully',
      data: {
        email,
        name,
        motive,
        recallDate,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}
