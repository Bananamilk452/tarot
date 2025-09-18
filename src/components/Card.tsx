import { cn } from "~/utils";

export function Card(
  props: {
    ref: React.Ref<HTMLDivElement | null>;
  } & React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      className={cn(
        "relative aspect-[3/5] w-32 rounded-lg bg-[url('/cards/back.jpg')] bg-cover shadow transition-opacity duration-300",
        props.className,
      )}
      ref={props.ref}
    />
  );
}
