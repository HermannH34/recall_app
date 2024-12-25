import FollowUpTable from '@/components/FollowUpTable'
import FollowUpModal from "@/components/FollowUpModal"

export default function FollowUpPage() {
 return (
  <div className="container mx-auto p-4">
   <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold ml-4">Actions 🙂📨</h1>
    <FollowUpModal/>
   </div>
   <FollowUpTable />
  </div>
 )
} 
