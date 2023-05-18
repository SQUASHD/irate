"use client";

import { useRouter } from "next/navigation";

export const CancelButton = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="text-sm font-semibold leading-6 text-white"
      onClick={() => router.back()}
    >
      Cancel
    </button>
  );
};
