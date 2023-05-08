import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDateDistance = (date: string) => {
  const newDate = new Date(date);
  const distance = formatDistanceToNow(newDate, { locale: ptBR });

  let formattedDate;
  if (distance.startsWith("cerca de")) {
    const newDistance = distance.replace("cerca de", "").trim();
    formattedDate = `${newDistance}`;
  } else if (distance.includes("minuto")) {
    const minutesMatch = distance.match(/\d+/);
    const minutesAgo = minutesMatch ? parseInt(minutesMatch[0], 10) : 0;
    formattedDate = `${minutesAgo} min`;
  } else {
    formattedDate = `${format(newDate, "d 'de' MMM", {
      locale: ptBR,
    })}`;
  }
  return formattedDate;
};

export const formatFullDate = (date: string) => {
  const newDate = new Date(date);
  const formattedDate = `${format(newDate, "HH:mm")} - ${format(
    newDate,
    "dd MMM yy",
    { locale: ptBR }
  )}`;
  return formattedDate;
};
