'use client'
import { updateComment } from "@/actions/recalls";

interface RecallCommentProps {
  recallId: string;
  initialComment?: string;
}

export default function RecallComment({ recallId, initialComment }: RecallCommentProps) {
  async function handleCommentSubmit(recallId: string, comment: string) {
    await updateComment(recallId, comment);
  }

  return (
    <input 
      type="text" 
      placeholder="Type here" 
      className="input input-ghost w-full max-w-xs"
      defaultValue={initialComment ?? ""}
      onBlur={(e) => handleCommentSubmit(recallId, e.target.value)}
    /> 
  )
} 