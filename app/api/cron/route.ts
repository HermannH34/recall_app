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

  await sendEmailsForLeads(recalls);

  return NextResponse.json({ success: true, recalls });
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

const generateEmailBody = (recall: {
 name: string;
 motive: string;
}): { text: string; html: string } => {
 const text = `
Nom: ${recall.name}
Motif de rappel: ${recall.motive}

`;

 const html = `
<p><strong>Nom:</strong> ${recall.name}</p>
<p><strong>Motif de rappel:</strong> ${recall.motive}</p>
<br>
`;

 return { text, html };
};

const sendEmailsForLeads = async (recalls: any[]) => {
 for (const recall of recalls) {
  const { text, html } = generateEmailBody({
   name: recall.name,
   motive: recall.motive,
  });

  try {
   await sendEmail({
    to: recall.email,
    subject: "Rappel programmé",
    text,
    html,
    replyTo: "hermannhairet44@gmail.com",
   });

   console.log(`Email sent to ${recall.email}`);
  } catch (emailError) {
   console.error(`Error sending email to ${recall.email}:`, emailError);
  }
 }
};
