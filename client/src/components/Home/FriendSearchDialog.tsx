import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FriendSearchResultCard } from "./FriendSearchResultCard";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import { User } from "@/utils/types/user";
import { toast } from "sonner";

export function FriendSearchDialog() {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const [keyword, setKeyword] = useState<string>("");

  const {
    data: friends,
    error,
    loading,
  } = useFetch<User[]>(`${SERVER_URL}/users/search?keyword=${keyword}`);

  const hanldeKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  if (error) toast.error(error);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Search Friends</DialogTitle>
        <DialogDescription>
          Search any friends to start a chat with them!
        </DialogDescription>
      </DialogHeader>
      <>
        <Input
          type="search"
          value={keyword}
          onChange={(e) => hanldeKeywordChange(e)}
          placeholder="Search by username or by name"
        />
        <div className="friend-search-dialog-content mt-4 flex max-h-[50dvh] flex-col gap-2 overflow-y-auto">
          {friends?.map(({ id, name, username }) => (
            <FriendSearchResultCard key={id} name={name} username={username} />
          ))}
        </div>
      </>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
