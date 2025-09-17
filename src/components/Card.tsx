import { cn } from "~/utils";

export function Card({
  ref,
  className,
}: {
  ref: React.Ref<HTMLDivElement | null>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[3/5] w-32 rounded-lg bg-[url('/cards/back.jpg')] bg-cover shadow transition-transform duration-300 hover:translate-y-6",
        className,
      )}
      ref={ref}
    />
  );
}
