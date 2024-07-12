import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./components/invite-guests-modal";
import { ConfirmTripModal } from "./components/confirm-trip-modal";
import { DestinationAndDateForm } from "./components/destination-and-date-form";
import { GuestsForm } from "./components/guests-form";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState("");
  const [tripRangeDate, setTripRangeDate] = useState<DateRange | undefined>();
  const [guestsList, setGuestsList] = useState<string[]>([]);
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

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

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  async function createTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(destination);
    console.log(tripRangeDate);
    console.log(ownerName);
    console.log(ownerEmail);

    if (!destination) {
      return;
    }

    if (!tripRangeDate?.from || !tripRangeDate?.to) {
      return;
    }

    if (guestsList.length === 0) {
      return;
    }

    if (!ownerName || !ownerEmail) {
      return;
    }

    const response = await api.post("/trips", {
      destination: destination,
      starts_at: tripRangeDate.from,
      ends_at: tripRangeDate.to,
      emails_to_invite: guestsList,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;
    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <div className="flex flex-col gap-3">
          <img src="/Logo.svg" alt="Logo planner" className="mx-auto" />
          <p className="mt-2 text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateForm
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            closeGuestsInput={closeGuestsInput}
            setDestination={setDestination}
            setTripRangeDate={setTripRangeDate}
            tripRangeDate={tripRangeDate}
          />

          {isGuestsInputOpen && (
            <GuestsForm
              guestsList={guestsList}
              openGuestsModal={openGuestsModal}
              openConfirmTripModal={openConfirmTripModal}
            />
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
          <InviteGuestsModal
            guestsList={guestsList}
            addGuestToList={handleAddGuestToList}
            removeGuestFromList={handleRemoveGuestFromList}
            closeGuestsModal={closeGuestsModal}
          />
        )}

        {isConfirmTripModalOpen && (
          <ConfirmTripModal
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
          />
        )}
      </div>
    </div>
  );
}
