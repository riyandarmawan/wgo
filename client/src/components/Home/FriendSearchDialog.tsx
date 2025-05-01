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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FriendCardSkeleton } from "./FriendCardSkeleton";
import { Friend } from "@/utils/types/friend";
import { useDebounce } from "use-debounce";

export function FriendSearchDialog() {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const [value, setValue] = useState<string>("");
  const [keyword] = useDebounce(value, 300);

  const {
    data: friends,
    error,
    loading,
  } = useFetch<Friend[]>(`${SERVER_URL}/users/search?keyword=${keyword}`);

  const handleValueChange = (value: string) => setValue(value);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Search Friends</DialogTitle>
        <DialogDescription>
          Search any friends to start a chat with them!
        </DialogDescription>
      </DialogHeader>
      <div>
        <Input
          type="search"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleValueChange(e.target.value)
          }
          placeholder="Search by username or by name"
        />
        <div className="friend-search-dialog-content mt-4 flex max-h-[50dvh] min-h-[40dvh] flex-col gap-2 overflow-y-auto">
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <FriendCardSkeleton key={idx} />
            ))
          ) : friends && friends.length > 0 ? (
            friends.map(({ id, name, username, friendshipStatus }) => (
              <FriendSearchResultCard
                key={id}
                id={id}
                name={name}
                username={username}
                friendshipStatus={friendshipStatus}
              />
            ))
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              No friends found.
            </div>
          )}
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary" className="cursor-pointer">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
