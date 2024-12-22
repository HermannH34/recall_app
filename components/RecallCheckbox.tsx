'use client'

import { toggleRecall } from "@/actions/recalls"

interface RecallCheckboxProps {
  recallId: string;
}

export default function RecallCheckbox({ recallId }: RecallCheckboxProps) {
  const handleChange = async () => {
    const result = await toggleRecall(recallId)

    if (!result.success) {
      console.error('Failed to update recall status')
    }
  }

  return (
    <label>
      <input 
        type="checkbox" 
        className="checkbox checkbox-primary" 
        onChange={handleChange}
      />
    </label>
  )
} 