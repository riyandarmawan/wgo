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
import { Search } from "lucide-react";
import { FriendSearchResultCard } from "./FriendSearchResultCard";

export function FriendSearchDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Search Friends</DialogTitle>
        <DialogDescription>
          Search any friends to start a chat with them!
        </DialogDescription>
      </DialogHeader>
      <div>
        <div className="flex Cards-center gap-2">
          <Input type="search" placeholder="Search by username or by name" />
          <Button variant="secondary">
            <Search />
          </Button>
        </div>
        <div className="mt-4 flex flex-col gap-2 overflow-y-auto max-h-[50dvh] friend-search-dialog-content">
          {/* Replace static with mapped data later */}
          <FriendSearchResultCard
            name="Riyan Darmawan"
            username="riyandarmawan"
          />
          <FriendSearchResultCard
            name="Riyan Darmawan"
            username="riyandarmawan"
          />
          <FriendSearchResultCard
            name="Riyan Darmawan"
            username="riyandarmawan"
          />
          <FriendSearchResultCard
            name="Riyan Darmawan"
            username="riyandarmawan"
          />
          <FriendSearchResultCard
            name="Riyan Darmawan"
            username="riyandarmawan"
          />
          <FriendSearchResultCard
            name="Riyan Darmawan"
            username="riyandarmawan"
          />
        </div>
      </div>
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
