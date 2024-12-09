import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <div className="w-full h-[120px]  border border-background_light_mode mx-auto p-4  rounded-[20px]">
      {/* Title */}
      <Skeleton className="h-6 w-40  mb-4 bg-background_light_mode" />

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full px-5 bg-background_light_mode" />
        <Skeleton className="h-4 w-[500px] bg-background_light_mode" />
      </div>
    </div>
  );
}
