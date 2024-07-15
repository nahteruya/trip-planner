import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./components/create-activity-modal";
import { ImportantLinks } from "./components/important-links";
import { Guests } from "./components/guests";
import { Activities } from "./components/activities";
import { DestinationAndDateHeader } from "./components/destination-and-date-header";
import { Button } from "../../components/Button";
import { CreateLinkModal } from "./components/create-link-modal";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  // const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }

  //   function openManageGuestsModal() {
  //   setIsManageGuestsModalOpen(true);
  // }

  // function closeManageGuestsModal() {
  //   setIsManageGuestsModalOpen(false);
  // }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DestinationAndDateHeader />

      <main className="mt-8 flex gap-16 px-6">
        <div className="flex-1">
          <header className="mb-6 flex w-full items-center justify-between">
            <h2 className="text-3xl font-semibold text-zinc-50">Atividades</h2>
            <Button onClick={openCreateActivityModal} variant="primary">
              <Plus />
              Cadatrar
            </Button>
          </header>

          <Activities />
        </div>

        <aside className="w-80">
          <ImportantLinks openCreateLinkModal={openCreateLinkModal} />

          <div className="my-6 h-px w-full bg-zinc-800" />

          <Guests />
        </aside>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  );
}
