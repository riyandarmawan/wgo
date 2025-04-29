import { Skeleton } from "@/components/ui/skeleton";

export function FriendCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-md border bg-secondary/20 px-4 py-2 shadow-md">
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="flex w-full flex-col gap-1">
        <Skeleton className="h-4 w-3/5 sm:w-2/5" />
        <Skeleton className="h-3 w-2/5 sm:w-1/4" />
      </div>
    </div>
  );
}
