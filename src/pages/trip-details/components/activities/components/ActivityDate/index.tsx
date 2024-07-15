import { format } from "date-fns";
import { ActivityDate } from "../..";
import { ptBR } from "date-fns/locale";
import { CircleCheck, CircleDashed } from "lucide-react";
import { ActivityItem } from "../ActivityItem";

interface ActivityDateComponentProps {
  activityDate: ActivityDate;
}

export function ActivityDateComponent({
  activityDate,
}: ActivityDateComponentProps) {
  const activityPassed = new Date() > new Date(activityDate.date);

  return (
    <div className="space-y-2.5">
      <header className="flex items-end gap-2">
        <h3
          className={`text-xl font-semibold ${activityPassed ? "text-zinc-400" : "text-zinc-50"}`}
        >{`Dia ${format(activityDate.date, "dd")}`}</h3>

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
          <ActivityItem key={activity.id} activity={activity} />
        ))
      )}
    </div>
  );
}
