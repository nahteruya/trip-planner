import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../../components/Button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DestinationAndDateFormProps {
  isGuestsInputOpen: boolean;
  tripRangeDate: DateRange | undefined;
  openGuestsInput: () => void;
  closeGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setTripRangeDate: (rangeDate: DateRange | undefined) => void;
}

export function DestinationAndDateForm({
  isGuestsInputOpen,
  tripRangeDate,
  openGuestsInput,
  closeGuestsInput,
  setDestination,
  setTripRangeDate,
}: DestinationAndDateFormProps) {
  const [isRangeDatePickerModalOpen, setIsRangeDatePickerModalOpen] =
    useState(false);

  function openRangeDatePickerModal() {
    setIsRangeDatePickerModalOpen(true);
  }

  function closeRangeDatePickerModal() {
    setIsRangeDatePickerModalOpen(false);
  }

  const displayedDate =
    tripRangeDate && tripRangeDate.from && tripRangeDate.to
      ? `${format(tripRangeDate.from, "d' de 'LLL", { locale: ptBR })} até ${format(tripRangeDate.to, "d' de 'LLL", { locale: ptBR })}`
      : null;

  return (
    <div className="flex h-16 items-center justify-between gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputOpen}
          onChange={(event) => setDestination(event.target.value)}
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
        />
      </div>

      <button
        onClick={openRangeDatePickerModal}
        disabled={isGuestsInputOpen}
        className="flex flex-1 items-center gap-2 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        {displayedDate ? (
          <span className="flex-1 text-lg text-zinc-100">{displayedDate}</span>
        ) : (
          <span className="flex-1 text-lg text-zinc-400">Quando</span>
        )}
      </button>

      <div className="h-6 w-px bg-zinc-800" />

      {isRangeDatePickerModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <header className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Selecione a data
                </h2>
                <button onClick={closeRangeDatePickerModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </header>

            <DayPicker
              mode="range"
              selected={tripRangeDate}
              onSelect={setTripRangeDate}
              modifiersClassNames={{ selected: "bg-lime-300 text-lime-950" }}
            />
          </div>
        </div>
      )}

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput} variant="primary">
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
