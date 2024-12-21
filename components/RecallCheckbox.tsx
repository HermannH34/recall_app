'use client'

import { toggleRecall } from "@/app/actions/recall"
import { useState } from "react"

interface RecallCheckboxProps {
  recallId: string
  initialChecked: boolean
}

export default function RecallCheckbox({ recallId, initialChecked }: RecallCheckboxProps) {
  const [isChecked, setIsChecked] = useState(initialChecked)

  const handleChange = async () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    const result = await toggleRecall(recallId, newValue)
    
    if (!result.success) {
      // Revert the checkbox if the server update failed
      setIsChecked(!newValue)
      console.error('Failed to update recall status')
    }
  }

  return (
    <label>
      <input 
        type="checkbox" 
        className="checkbox" 
        checked={isChecked}
        onChange={handleChange}
      />
    </label>
  )
} 