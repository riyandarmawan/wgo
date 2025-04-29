import { Link } from "react-router-dom";

type RoomItemProps = {
  name: string;
  date: string;
  message: string;
};

export function RoomItem({ name, date, message }: RoomItemProps) {
  return (
    <Link
      to="#"
      className="flex items-center gap-2 rounded-md border bg-secondary/20 p-4 shadow-md transition hover:bg-secondary"
    >
      <div className="size-16 shrink-0 rounded-full bg-blue-500" />
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center justify-between">
          <h2 className="line-clamp-1 text-lg font-semibold">{name}</h2>
          <p className="text-xs text-primary/70">{date}</p>
        </div>
        <p className="line-clamp-1 text-sm text-primary/80">{message}</p>
      </div>
    </Link>
  );
}
