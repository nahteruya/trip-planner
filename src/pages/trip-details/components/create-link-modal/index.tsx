import { Link2, Tag } from "lucide-react";
import { Input } from "../../../../components/Input";
import { Modal } from "../../../../components/Modal";
import { Button } from "../../../../components/Button";
import { useParams } from "react-router-dom";
import { FormEvent } from "react";
import { api } from "../../../../lib/axios";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams();

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("linkTitle")?.toString();
    const url = data.get("url")?.toString();

    console.log({ title, url });

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    window.document.location.reload();
  }

  return (
    <Modal
      title="Cadastrar link"
      subtitle="Todos convidados podem visualizar os links importantes."
      closeModal={closeCreateLinkModal}
    >
      <form onSubmit={createLink} className="space-y-3">
        <Input type="text" name="linkTitle" placeholder="Título do link">
          <Tag className="size-5 text-zinc-400" />
        </Input>
        <Input type="url" name="url" placeholder="URL">
          <Link2 className="size-5 text-zinc-400" />
        </Input>

        <Button type="submit" variant="primary" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  );
}
