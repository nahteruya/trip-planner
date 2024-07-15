import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  title: string;
  subtitle?: string;
  closeModal: () => void;
  children: ReactNode;
}

export function Modal({ title, subtitle, closeModal, children }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="max-w-[540px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <button onClick={closeModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          {subtitle && (
            <p className="text-left text-sm text-zinc-400">{subtitle}</p>
          )}
        </header>

        {children}
      </div>
    </div>
  );
}
