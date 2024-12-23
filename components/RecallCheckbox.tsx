'use client';

import { toggleRecall } from "@/actions/recalls";
import { useTransition } from "react";

interface RecallCheckboxProps {
  recallId: string;
}

export default function RecallCheckbox({ recallId }: RecallCheckboxProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = async () => {
    const result = await toggleRecall(recallId);

    if (!result.success) {
      console.error('Failed to update recall status');
    } else {
      startTransition(() => {
        window.location.reload();
      });
    }
  };

  return (
    <label>
      <input 
        type="checkbox" 
        className="checkbox checkbox-primary" 
        onChange={handleChange}
        disabled={isPending}
      />
    </label>
  );
}
