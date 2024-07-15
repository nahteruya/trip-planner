import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../../../components/Button";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../lib/axios";
import { InviteGuestsModal } from "../../../create-trip/components/invite-guests-modal";

export interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

// interface GuestsProps {
//   isManageGuestsModalOpen: boolean;
//   openManageGuestsModal: () => void;
//   closeManageGuestsModal: () => void;
// }

export function Guests() {
  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);
  const [guestsList, setGuestsList] = useState<Participant[]>([]);
  const { tripId } = useParams();

  function openManageGuestsModal() {
    setIsManageGuestsModalOpen(true);
  }

  function closeManageGuestsModal() {
    setIsManageGuestsModalOpen(false);
  }

  useEffect(() => {
    async function fetchTripData() {
      const response = await api.get(`/trips/${tripId}/participants`);
      const { participants } = response.data;
      setGuestsList(participants);
    }
    fetchTripData();
  }, [tripId]);

  async function handleAddGuestOnList(e: FormEvent<HTMLFormElement>) {
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString();
    await api.post(`/trips/${tripId}/invites`, {
      email,
    });
  }

  function handleRemoveGuestFromList(guest: string) {
    setGuestsList((prevGuestsList) =>
      prevGuestsList.filter((item) => item.email !== guest),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold text-zinc-50">Convidados</h3>

      <div className="flex flex-col gap-5">
        {guestsList.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between"
          >
            <div className="w-60 space-y-1.5">
              <span className="font-medium text-zinc-100">
                {participant.name || `Convidado ${index}`}
              </span>
              <p className="text-sm text-zinc-400">{participant.email}</p>
            </div>
            {participant.is_confirmed ? (
              <CircleCheck className="size-5 text-lime-300" />
            ) : (
              <CircleDashed className="size-5 text-zinc-400" />
            )}
          </div>
        ))}
      </div>

      <Button onClick={openManageGuestsModal} variant="secondary" size="full">
        <UserCog className="size-5 text-zinc-200" />
        Gerenciar convidados
      </Button>

      {isManageGuestsModalOpen && (
        <InviteGuestsModal
          guestsList={guestsList.map((guest) => guest.email)}
          addGuestToList={handleAddGuestOnList}
          closeGuestsModal={closeManageGuestsModal}
          removeGuestFromList={handleRemoveGuestFromList}
        />
      )}
    </div>
  );
}
