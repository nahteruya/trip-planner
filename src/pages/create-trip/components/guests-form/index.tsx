import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../../components/Button";

interface GuestsFormProps {
  guestsList: string[];
  openGuestsModal: () => void;
  openConfirmTripModal: () => void;
}

export function GuestsForm({
  guestsList,
  openGuestsModal,
  openConfirmTripModal,
}: GuestsFormProps) {
  return (
    <div className="flex h-16 items-center justify-between gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <button
        type="button"
        onClick={openGuestsModal}
        className="flex flex-1 items-center gap-2 text-left"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {guestsList.length === 0 ? (
          <span className="flex-1 text-lg text-zinc-400">
            Quem estará na viagem?
          </span>
        ) : (
          <span className="flex-1 text-lg text-zinc-100">
            {guestsList.length} pessoa(s) convidada(s)
          </span>
        )}
      </button>
      <Button type="button" onClick={openConfirmTripModal} variant="primary">
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
