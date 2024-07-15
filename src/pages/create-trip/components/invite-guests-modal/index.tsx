import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../../components/Button";
import { Modal } from "../../../../components/Modal";

interface IviteGuestsModal {
  guestsList: string[];
  addGuestToList: (event: FormEvent<HTMLFormElement>) => void;
  removeGuestFromList: (guest: string) => void;
  closeGuestsModal: () => void;
}

export function InviteGuestsModal({
  guestsList,
  addGuestToList,
  removeGuestFromList,
  closeGuestsModal,
}: IviteGuestsModal) {
  return (
    <Modal
      title="Selecionar convidados"
      subtitle="Os convidados irão receber e-mails para confirmar a participação na
            viagem."
      closeModal={closeGuestsModal}
    >
      <div className="flex max-w-xl flex-wrap gap-2">
        {guestsList.map((guest) => (
          <div
            key={guest}
            className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
          >
            <span className="text-zinc-300">{guest}</span>
            <button onClick={() => removeGuestFromList(guest)}>
              <X className="size-4 text-zinc-400" />
            </button>
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-zinc-800" />

      <form
        onSubmit={addGuestToList}
        className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2"
      >
        <AtSign className="size-5 text-zinc-400" />
        <input
          type="email"
          name="email"
          placeholder="Digite o e-mail do convidado"
          className="flex-1 bg-transparent outline-none"
        />
        <Button type="submit" variant="primary">
          Convidar
          <Plus className="size-5" />
        </Button>
      </form>
    </Modal>
  );
}
