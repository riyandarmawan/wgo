import { Link } from "react-router-dom";

type DummyRooms = {
  name: string;
  date: string;
  message: string;
}[];

const dummyRooms: DummyRooms = [
  {
    name: "Riyan Darmawan",
    date: "12:45 PM",
    message: "gitu sihh",
  },
  {
    name: "Seseorang",
    date: "8:07 PM",
    message: "mungkin jugaa",
  },
  {
    name: "Yang Pasti Orang",
    date: "7:20 PM",
    message: "menarik nihh",
  },
  {
    name: "Nina Ayu",
    date: "11:03 AM",
    message: "lagi sibuk kerjaan 😵‍💫",
  },
  {
    name: "Andi Saputra",
    date: "09:15 AM",
    message: "besok kita ketemu ya!",
  },
  {
    name: "Bella Putri",
    date: "10:58 AM",
    message: "hah seriusan? 😳",
  },
  {
    name: "Kelana Rindu",
    date: "03:21 PM",
    message: "cuacanya enak buat ngopi ☕",
  },
  {
    name: "Doni Prakoso",
    date: "06:45 PM",
    message: "bentar lagi nyampe",
  },
  {
    name: "Tia Rahma",
    date: "01:10 PM",
    message: "udah aku kirim yaa~",
  },
  {
    name: "Bayu Wijaya",
    date: "02:30 PM",
    message: "boleh juga idenya!",
  },
];

export default function Rooms() {
  return (
    <div className="overflow-y-auto py-6 px-2 sm:px-4 flex flex-col gap-4">
      {dummyRooms.map((room, index) => (
        <Link
          to="#"
          key={index}
          className="flex items-center gap-2 rounded-md border bg-secondary/20 p-4 shadow-md transition hover:bg-secondary"
        >
          <div className="size-16 shrink-0 rounded-full bg-blue-500" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center justify-between">
              <h2 className="line-clamp-1 text-lg font-semibold">
                {room.name}
              </h2>
              <p className="text-xs text-primary/70">{room.date}</p>
            </div>
            <p className="line-clamp-1 text-sm text-primary/80">
              {room.message}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
