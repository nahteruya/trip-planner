import { Link2, Plus } from "lucide-react";
import { Button } from "../../../../components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../lib/axios";

interface Link {
  id: string;
  title: string | null;
  url: string;
}

interface ImportantLinksProps {
  openCreateLinkModal: () => void;
}

export function ImportantLinks({ openCreateLinkModal }: ImportantLinksProps) {
  const [importantLinksList, setImportantLinksList] = useState<Link[]>([]);
  const { tripId } = useParams();

  useEffect(() => {
    async function fetchTripData() {
      const response = await api.get(`/trips/${tripId}/links`);
      const { links } = response.data;
      setImportantLinksList(links);
    }
    fetchTripData();
  }, [tripId]);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold text-zinc-50">Links importantes</h3>

      <div className="flex flex-col gap-5">
        {importantLinksList.map((link) => (
          <div className="flex items-center justify-between">
            <div className="w-60 space-y-1.5">
              <span className="font-medium text-zinc-100">{link.title}</span>
              <p className="truncate text-sm text-zinc-400">{link.url}</p>
            </div>
            <a href={link.url} target="_blank">
              <Link2 className="size-5 text-zinc-400" />
            </a>
          </div>
        ))}
      </div>

      <Button onClick={openCreateLinkModal} variant="secondary" size="full">
        <Plus className="size-5 text-zinc-200" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
