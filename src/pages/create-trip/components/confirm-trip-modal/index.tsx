import { Mail, User } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Modal } from "../../../../components/Modal";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ConfirmTripModalProps {
  destination: string;
  tripRangeDate: DateRange | undefined;
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (ownerName: string) => void;
  setOwnerEmail: (ownerEmail: string) => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  destination,
  tripRangeDate,
}: ConfirmTripModalProps) {
  const displayedDate =
    tripRangeDate && tripRangeDate.from && tripRangeDate.to
      ? `${format(tripRangeDate.from, "d' de 'LLLL", { locale: ptBR })} até ${format(tripRangeDate.to, "d' de 'LLLL", { locale: ptBR })}`
      : null;
  const subtitle = `Para concluir a criação da viagem para ${destination} nas datas de ${displayedDate} preencha seus dados abaixo:`;
  return (
    <Modal
      title="Confirmar criação de viagem"
      subtitle={subtitle}
      closeModal={closeConfirmTripModal}
    >
      <form onSubmit={createTrip} className="space-y-3">
        <Input
          type="text"
          name="fullname"
          placeholder="Seu nome completo"
          onChange={(event) => setOwnerName(event.target.value)}
        >
          <User className="size-5 text-zinc-400" />
        </Input>
        <Input
          type="email"
          name="email"
          placeholder="Seu e-mail pessoal"
          onChange={(event) => setOwnerEmail(event.target.value)}
        >
          <Mail className="size-5 text-zinc-400" />
        </Input>

        <Button type="submit" variant="primary" size="full">
          Confirmação criação da viagem
        </Button>
      </form>
    </Modal>
  );
}
