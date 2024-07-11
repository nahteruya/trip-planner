import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../../components/Button";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Selecionar convidados
            </h2>
            <button onClick={closeGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-left text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </header>

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
      </div>
    </div>
  );
}
