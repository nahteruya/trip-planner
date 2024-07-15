import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../lib/axios";
import { ActivityDateComponent } from "./components/ActivityDate";

export interface Activity {
  id: string;
  title: string | null;
  occurs_at: string;
}

export interface ActivityDate {
  date: string;
  activities: Activity[];
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
        <ActivityDateComponent activityDate={activityDate} />
      ))}
    </div>
  );
}
