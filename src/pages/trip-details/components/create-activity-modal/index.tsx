import { Calendar, Clock, Tag } from "lucide-react";
import { Button } from "../../../../components/Button";
import { FormEvent } from "react";
import { api } from "../../../../lib/axios";
import { useParams } from "react-router-dom";
import { Input } from "../../../../components/Input";
import { Modal } from "../../../../components/Modal";

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
    <Modal
      title="Cadastrar atividade"
      subtitle="Todos convidados podem visualizar as atividades."
      closeModal={closeCreateActivityModal}
    >
      <form onSubmit={createActivity} className="space-y-3">
        <Input type="text" name="activityName" placeholder="Qual atividade?">
          <Tag className="size-5 text-zinc-400" />
        </Input>
        <div className="flex gap-2">
          <Input type="date" name="date" placeholder="Qual dia?">
            <Calendar className="size-5 text-zinc-400" />
          </Input>
          <Input type="time" name="time" placeholder="Horário">
            <Clock className="size-5 text-zinc-400" />
          </Input>
        </div>
        <Button type="submit" variant="primary" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  );
}
