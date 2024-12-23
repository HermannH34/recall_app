import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/libs/mongoose";
import Recall from "@/models/Recall";
import { sendEmail } from "@/libs/resend";
import { revalidatePath } from "next/cache";

const forceRevalidate = (request: NextRequest) => {
 const path = request.nextUrl.searchParams.get("path") || "/";
 revalidatePath(path);
};

export async function GET(request: NextRequest) {
 forceRevalidate(request);

 try {
  await connectMongo();

  const startDate = getDateRangeForToday();

  const recalls = await Recall.find({
   recallDate: {
    $gte: startDate,
   },
  });


  if (recalls.length > 0) await sendEmailsForLeads(recalls);

  return NextResponse.json({ success: true, recalls }
  );
 } catch (error) {
  console.error("Error fetching leads by date: ", error);
  return NextResponse.json(
   { success: false, error: "Internal server error" },
   { status: 500 }
  );
 }
}

const getDateRangeForToday = (): Date => {
 const today = new Date();
 today.setHours(0, 0, 0, 0);

 return today
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
  Nom: ${recall.name} - Motif de rappel: ${recall.motive}
  
  `;

  html += `
  <span>🚀 <br>Nom:</br> ${recall.name} - <br>Motif de rappel:</br> ${recall.motive}</span><br>
`;
 }

 const endOfMessageText = "\n\n👀 Tu peux checker le tableau avec tout tes rappels en cours ici: https://recall-app-ashen.vercel.app/recalls";
 const endOfMessageHtml = `
 <br>
 👀 <strong>Tu peux checker le tableau avec tout tes rappels en cours ici:</strong> 
 <a href="https://recall-app-ashen.vercel.app/recalls" target="_blank">https://recall-app-ashen.vercel.app/recalls</a>
 `;

 text += endOfMessageText;
 html += endOfMessageHtml;

 return { text, html };
};


const sendEmailsForLeads = async (recalls: any[]) => {

 const { text, html } = generateEmailBody(recalls);

 try {

  await sendEmail({
   to: "hermannhairet44@gmail.com",
   subject: "Rappels programmés aujourd'hui",
   text,
   html,
   replyTo: "hermannhairet44@gmail.com",
  });


 } catch (emailError) {
  console.error(`Error sending email`, emailError);
 }

};
