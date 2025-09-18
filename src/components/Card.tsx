import { cn } from "~/utils";

export function Card(
  props: {
    card: string;
    ref: React.Ref<HTMLDivElement | null>;
  } & React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      className={cn(
        "w-30 relative aspect-[3/5] cursor-pointer rounded-lg bg-[url('/cards/back.jpg')] bg-cover shadow transition-opacity duration-300",
        props.className,
      )}
      ref={props.ref}
    />
  );
}
