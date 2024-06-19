import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Skeleton className="w-[860px] h-[580px]" />
    </div>
  );
}
