import {
  MapPin,
  Calendar,
  ArrowRight,
  UserRoundPlus,
  Settings2,
  X,
  AtSign,
  Plus,
} from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [guestsList, setGuestsList] = useState<string[]>([]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function handleAddGuestToList(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (guestsList.includes(email)) {
      return alert("E-mail já adicionado");
    }

    setGuestsList((prevGuestsList) => [...prevGuestsList, email]);
    e.currentTarget.reset();
  }

  function handleRemoveGuestFromList(guest: string) {
    setGuestsList((prevGuestsList) =>
      prevGuestsList.filter((item) => item !== guest),
    );
  }

  return (
    <div className="bg-pattern flex h-screen items-center justify-center bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <div className="flex flex-col gap-3">
          <img src="/Logo.svg" alt="Logo planner" className="mx-auto" />
          <p className="mt-2 text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <div className="shadow-shape flex h-16 items-center justify-between gap-3 rounded-xl bg-zinc-900 px-4">
            <div className="flex flex-1 items-center gap-2">
              <MapPin className="size-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Para onde você vai?"
                disabled={isGuestsInputOpen}
                className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Quando?"
                disabled={isGuestsInputOpen}
                className="w-40 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>

            <div className="h-6 w-px bg-zinc-800" />

            {isGuestsInputOpen ? (
              <button
                onClick={closeGuestsInput}
                className="flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-2 text-zinc-200 hover:bg-zinc-700"
              >
                Alterar local/data
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button
                onClick={openGuestsInput}
                className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 hover:bg-lime-400"
              >
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {isGuestsInputOpen && (
            <div className="shadow-shape flex h-16 items-center justify-between gap-3 rounded-xl bg-zinc-900 px-4">
              <button
                type="button"
                onClick={openGuestsModal}
                className="flex flex-1 items-center gap-2 text-left"
              >
                <UserRoundPlus className="size-5 text-zinc-400" />
                <span className="flex-1 text-lg text-zinc-400">
                  Quem estará na viagem?
                </span>
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 hover:bg-lime-400"
              >
                Confirmar viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <p className="mx-auto max-w-lg text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com
          nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>

        {isGuestsModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <div className="shadow-shape w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
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
                  Os convidados irão receber e-mails para confirmar a
                  participação na viagem.
                </p>
              </header>

              <div className="flex max-w-xl flex-wrap gap-2">
                {guestsList.map((guest) => (
                  <div
                    key={guest}
                    className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
                  >
                    <span className="text-zinc-300">{guest}</span>
                    <button onClick={() => handleRemoveGuestFromList(guest)}>
                      <X className="size-4 text-zinc-400" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="h-px w-full bg-zinc-800" />

              <form
                onSubmit={handleAddGuestToList}
                className="flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2"
              >
                <AtSign className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado"
                  className="flex-1 bg-transparent outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 hover:bg-lime-400"
                >
                  Convidar
                  <Plus className="size-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
