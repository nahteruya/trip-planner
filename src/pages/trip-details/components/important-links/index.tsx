import { Link2, Plus } from "lucide-react";
import { Button } from "../../../../components/Button";

export function ImportantLinks() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold text-zinc-50">Links importantes</h3>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="w-60 space-y-1.5">
            <span className="font-medium text-zinc-100">Reserva do AirBnB</span>
            <p className="truncate text-sm text-zinc-400">
              https://www.airbnb.com.br/rooms/104700011
            </p>
          </div>
          <a href="#">
            <Link2 className="size-5 text-zinc-400" />
          </a>
        </div>
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5 text-zinc-200" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
