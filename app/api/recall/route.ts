// import mongoose, { Schema, Document, Model } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

// const MONGO_URI = 'your_mongodb_connection_string_here';

// Interface for user document
// interface IUser extends Document {
//  email: string;
//  name: string;
//  motive: string;
//  initialDate: Date;
//  formattedDate: Date;
// }

// MongoDB connection helper
// const connectToDatabase = async (): Promise<void> => {
//  if (mongoose.connections[0].readyState) return;
//  await mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//  });
// };

// Mongoose schema for user
// const userSchema: Schema = new mongoose.Schema({
//  email: { type: String, required: true },
//  name: { type: String, required: true },
//  motive: { type: String, required: true },
//  initialDate: { type: Date, required: true },
//  formattedDate: { type: Date, required: true },
// });

// // Mongoose model for user
// const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

// Utility function to calculate formatted date
const getFormattedDate = (date: Date): Date => {
 const isWeekend = (day: number): boolean => day === 6 || day === 0;
 const isFridayOrThursday = (day: number): boolean => day >= 4;

 let newDate = new Date(date);
 newDate.setDate(newDate.getDate() + 3);

 while (isWeekend(newDate.getDay()) || (isFridayOrThursday(date.getDay()) && newDate.getDay() === 0)) {
  newDate.setDate(newDate.getDate() + 1);
 }

 return newDate;
};

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
 if (req.method !== 'POST') {
  return res.status(405).json({ message: 'Method not allowed' });
 }

 const { email, name, motive } = req.body;

 if (!email || !name || !motive) {
  return res.status(400).json({ message: 'Email, name, and motive are required' });
 }

 try {
  // await connectToDatabase();

  const initialDate = new Date();
  const formattedDate = getFormattedDate(initialDate);

  // const userData = new User({
  //  email,
  //  name,
  //  motive,
  //  initialDate,
  //  formattedDate,
  // });

  // await userData.save();

  res.status(201).json({
   message: 'Data saved successfully',
   data: {
    email,
    name,
    motive,
    initialDate,
    formattedDate,
   },
  });
 } catch (error) {
  res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
 }
}
