import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Recall from "@/models/Recall";

export async function GET() {
 try {
  await connectMongo();

  const { startDate, endDate } = getDateRangeForToday();

  const leads = await Recall.find({
   recallDate: {
    $gte: startDate,
    $lt: endDate,
   },
  });


  console.log("Leads to recall:", leads);

  return NextResponse.json({ success: true, leads });
 } catch (error) {
  console.error("Error fetching leads by date: ", error);
  return NextResponse.json(
   { success: false, error: "Internal server error" },
   { status: 500 }
  );
 }
}


const getDateRangeForToday = (): { startDate: Date; endDate: Date } => {
 const today = new Date();
 today.setHours(0, 0, 0, 0);

 const tomorrow = new Date(today);
 tomorrow.setDate(today.getDate() + 1);

 return { startDate: today, endDate: tomorrow };
};
