"use client";
import { useState } from "react";
import { EditIcon } from "@/assets/icons";

export default function ToggleEdit({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <div className={`${open ? "block" : "invisible"} w-full`}>{children}</div>
      <button onClick={() => setOpen(!open)} className="flex items-center">
        <EditIcon className="aspect-square w-4 text-zinc-200" />
      </button>
    </div>
  );
}
