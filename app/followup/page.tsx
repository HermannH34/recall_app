import FollowUpTable from '@/components/RecallTable'
import CreateFollowUp from "@/components/CreateFollowUp";

export default function RecallsPage() {
 return (
  <div className="container mx-auto p-4">
   <h1 className="text-2xl font-bold mb-4">Relances 🙂📨</h1>
   <button className="btn" onClick={() => document.getElementById(<CreateFollowUp />).showModal()}>Créer une relance</button>
   <FollowUpTable />
  </div>
 )
} 
