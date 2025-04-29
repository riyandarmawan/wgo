import { RoomItem } from "./RoomItem"; // Import the new RoomItem component

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
    <div className="flex flex-col gap-4 overflow-y-auto px-2 py-6 sm:px-4">
      {dummyRooms.map((room, index) => (
        <RoomItem
          key={index}
          name={room.name}
          date={room.date}
          message={room.message}
        />
      ))}
    </div>
  );
}
