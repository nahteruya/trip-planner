import { Calendar, Clock, Tag, X } from "lucide-react";
import { Button } from "../../../../components/Button";
import { FormEvent } from "react";
import { api } from "../../../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("activityName")?.toString();
    const date = data.get("date")?.toString();
    const time = data.get("time")?.toString();
    console.log({ title, date, time });

    await api.post(`/trips/${tripId}/activities`, {
      occurs_at: `${date}T${time}`,
      title: title,
    });

    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[540px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Cadastrar atividade
            </h2>
            <button onClick={closeCreateActivityModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-left text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </header>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="activityName"
              placeholder="Qual atividade?"
              className="flex-1 bg-transparent outline-none"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="date"
                name="date"
                placeholder="Qual dia?"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <Clock className="size-5 text-zinc-400" />
              <input
                type="time"
                name="time"
                placeholder="Horário"
                className="w-36 bg-transparent outline-none"
              />
            </div>
          </div>
          <Button type="submit" variant="primary" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}
