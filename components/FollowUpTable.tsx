"use server"
import ProspectFollowUp from "@/models/ProspectFollowUp";
import connectMongo from "@/libs/mongoose";
import { revalidatePath } from 'next/cache';
import FollowUpButton from "./FollowUpButton";

async function getProspects() {
 try {
  await connectMongo();
  const prospects = await ProspectFollowUp.find()
  revalidatePath('/recalls');

  return prospects
 } catch (error) {
  console.error('Error fetching prospects:', error)
  return []
 }
}

export default async function RecallTable() {
 const prospects = await getProspects()

 return (
  <div className="overflow-x-auto">
   <table className="table">
    <thead>
     <tr>
      <th>
       <label>
        <input type="checkbox" className="checkbox" disabled />
       </label>
      </th>
      <th>Nom</th>
      <th>Email</th>
      <th>Type de Juriste</th>
      <th>Etape de la relance</th>
     </tr>
    </thead>
    <tbody>
     {prospects.map((prospect) => (
      <tr key={prospect._id} className="border-t-2">
       <td>
        <div className="flex items-center gap-3">
         <div>
          <div className="font-bold">{prospect.name}</div>
         </div>
        </div>
       </td>
       <td>{prospect.email}</td>
       <td>{prospect.typeOfLegalProfessional}</td>
       <td><FollowUpButton followUpNumber={prospect.followUpCounter} /></td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 )
} 