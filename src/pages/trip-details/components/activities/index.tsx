import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ActivityDate {
  date: string;
  activities: {
    id: string;
    title: string | null;
    occurs_at: string;
  }[];
}

export function Activities() {
  const [activitiesList, setActivitiesList] = useState<ActivityDate[]>([]);
  const { tripId } = useParams();

  useEffect(() => {
    async function fetchTripData() {
      const response = await api.get(`/trips/${tripId}/activities`);
      const { activities } = response.data;
      setActivitiesList(activities);
    }
    fetchTripData();
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activitiesList.map((activityDate) => (
        <div key={activityDate.date} className="space-y-2.5">
          <header className="flex items-end gap-2">
            <h3 className="text-xl font-semibold text-zinc-300">{`Dia ${format(activityDate.date, "dd")}`}</h3>
            <span className="text-xs text-zinc-500">
              {format(activityDate.date, "EEEE", {
                locale: ptBR,
              })}
            </span>
          </header>
          {activityDate.activities.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nenhuma atividade cadastrada nessa data.
            </p>
          ) : (
            activityDate.activities.map((activity) => (
              <div
                key={activity.id}
                className="flex h-10 items-center gap-3 rounded-xl bg-zinc-900 px-4"
              >
                <CircleCheck className="size-5 text-lime-300" />
                <p className="flex-1 text-zinc-100">{activity.title}</p>
                <span className="text-sm text-zinc-400">
                  {format(activity.occurs_at, "hh':'mm")}
                </span>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}
