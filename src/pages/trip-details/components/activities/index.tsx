import { CircleCheck } from "lucide-react";

export function Activities() {
  return (
    <div className="space-y-8">
      <div className="space-y-2.5">
        <header className="flex items-baseline gap-2">
          <h3 className="text-xl font-semibold text-zinc-300">Dia 17</h3>
          <span className="text-xs text-zinc-500">Sábado</span>
        </header>
        <p className="text-sm text-zinc-500">
          Nenhuma atividade cadastrada nessa data.
        </p>
      </div>

      <div className="space-y-2.5">
        <header className="flex items-end gap-2">
          <h3 className="text-xl font-semibold text-zinc-300">Dia 18</h3>
          <span className="text-xs text-zinc-500">Domingo</span>
        </header>
        <div className="flex h-10 items-center gap-3 rounded-xl bg-zinc-900 px-4">
          <CircleCheck className="size-5 text-lime-300" />
          <p className="flex-1 text-zinc-100">Corrida de Kart</p>
          <span className="text-sm text-zinc-400">14h00</span>
        </div>
        <div className="flex h-10 items-center gap-3 rounded-xl bg-zinc-900 px-4">
          <CircleCheck className="size-5 text-lime-300" />
          <p className="flex-1 text-zinc-100">Corrida de Kart</p>
          <span className="text-sm text-zinc-400">14h00</span>
        </div>
      </div>
    </div>
  );
}
