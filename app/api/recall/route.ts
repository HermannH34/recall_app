import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Recall from "@/models/Recall";

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

export async function POST(req: NextRequest) {
 try {
  const body = await req.json();
  const { email, name, motive } = body;

  if (!email || !name || !motive) {
   return NextResponse.json({ message: "Email, name, and motive are required" }, { status: 400 });
  }

  const initialDate = new Date();
  const formattedDate = getFormattedDate(initialDate);

  await connectMongo();

  const userData = new Recall({
   email,
   name,
   motive,
   recallDate: formattedDate,
  });

  await userData.save();

  return NextResponse.json({
   message: "Data saved successfully",
   data: { email, name, motive, initialDate, formattedDate },
  }, { status: 201 });
 } catch (error) {
  console.error("Error saving data:", error);
  return NextResponse.json({ message: "Internal server error", error: (error as Error).message }, { status: 500 });
 }
}
