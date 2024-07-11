import { CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../../../components/Button";

export function Guests() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold text-zinc-50">Convidados</h3>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="w-60 space-y-1.5">
            <span className="font-medium text-zinc-100">Naomi Teruya</span>
            <p className="text-sm text-zinc-400">nahteruya@gmail.com</p>
          </div>
          <button>
            <CircleDashed className="size-5 text-zinc-400" />
          </button>
        </div>
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5 text-zinc-200" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
