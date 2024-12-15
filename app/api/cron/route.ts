import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Recall from "@/models/Recall";
import { sendEmail } from "@/libs/resend";

export async function GET() {
 try {
  await connectMongo();

  const { startDate, endDate } = getDateRangeForToday();

  const recalls = await Recall.find({
   recallDate: {
    $gte: startDate,
    $lt: endDate,
   },
  });


  if (recalls.length > 0) await sendEmailsForLeads(recalls);

  return NextResponse.json({ success: true, recalls, timestamp: new Date() }, {
   headers: {
    'Cache-Control': 'no-store',
    'Vercel-CDN-Cache-Control': 'no-store',
   },
  });
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

type RecallObject = {
 name: string;
 motive: string;
};


const generateEmailBody = (recalls: RecallObject[]): { text: string; html: string } => {
 const message = `Hello Clara voici la liste de tes rappels aujourd'hui: <br><br>`
 let text = message
 let html = message

 for (const recall of recalls) {
  text += `
  Nom: ${recall.name}
  Motif de rappel: ${recall.motive}
  
  `;

  html += `
  <p><strong>🚀 Nom:</strong> <strong>${recall.name}</strong></p>
  <p>Motif de rappel: ${recall.motive}</p>
  <br>
  `;
 }

 return { text, html };
};


const sendEmailsForLeads = async (recalls: any[]) => {

 const { text, html } = generateEmailBody(recalls);

 try {

  await sendEmail({
   to: recalls[0].email,
   subject: "Rappels programmés aujourd'hui",
   text,
   html,
   replyTo: "hermannhairet44@gmail.com",
  });


 } catch (emailError) {
  console.error(`Error sending email`, emailError);
 }

};
