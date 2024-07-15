import { ComponentProps, ReactNode } from "react";

interface InputProps extends ComponentProps<"input"> {
  children: ReactNode;
}

export function Input({ children, ...props }: InputProps) {
  return (
    <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
      {children}
      <input
        {...props}
        className="flex-1 bg-transparent placeholder-zinc-400 outline-none"
      />
    </div>
  );
}
