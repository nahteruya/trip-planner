import { format } from "date-fns";
import { CircleCheck, CircleDashed } from "lucide-react";
import { Activity } from "../..";

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const activityPassed = new Date() > new Date(activity.occurs_at);

  return (
    <div
      key={activity.id}
      className="flex h-10 items-center gap-3 rounded-xl bg-zinc-900 px-4"
    >
      {activityPassed ? (
        <CircleCheck className="size-5 text-lime-300" />
      ) : (
        <CircleDashed className="size-5 text-zinc-400" />
      )}
      <p
        className={`flex-1 ${activityPassed ? "text-zinc-400" : "text-zinc-50"}`}
      >
        {activity.title}
      </p>
      <span className="text-sm text-zinc-400">
        {format(activity.occurs_at, "hh':'mm")}
      </span>
    </div>
  );
}
