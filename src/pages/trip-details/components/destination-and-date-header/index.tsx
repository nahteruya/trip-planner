import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../../components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
  const [tripData, setTripData] = useState<Trip | undefined>();
  const { tripId } = useParams();

  useEffect(() => {
    async function fetchTripData() {
      const response = await api.get(`/trips/${tripId}`);
      const { trip } = response.data;
      setTripData(trip);
    }
    fetchTripData();
  }, [tripId]);

  const displayedDate = tripData
    ? `${format(tripData.starts_at, "d' de 'LLL", { locale: ptBR })} até ${format(tripData.ends_at, "d' de 'LLL", { locale: ptBR })}`
    : null;

  return (
    <div className="flex h-16 items-center justify-between gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="flex-1 text-lg text-zinc-100">
          {tripData?.destination}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <span className="flex-1 text-lg text-zinc-100">{displayedDate}</span>
      </div>

      <div className="h-6 w-px bg-zinc-800" />

      <Button variant="secondary">
        Alterar local/data
        <Settings2 className="size-5" />
      </Button>
    </div>
  );
}
