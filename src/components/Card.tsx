import { useEffect, useState } from "react";

import { cn } from "~/utils";

type CardProps = {
  name: string;
  side: "front" | "back";
  flip: boolean;
  ref?: React.Ref<HTMLDivElement | null>;
} & React.HTMLAttributes<HTMLDivElement>;

export function Card(props: CardProps) {
  const { name, side, flip, className, ref, ...rest } = props;
  const cardName = name.replace(/ /g, "_");

  return (
    <div
      {...rest}
      className={cn(
        "w-30 relative aspect-[3/5] cursor-pointer overflow-hidden rounded-lg shadow transition-opacity duration-300",
        className,
      )}
      ref={ref}
    >
      <div
        className={cn(
          "transform-3d relative size-full pb-[100%] transition-transform duration-700",
          side === "front" ? "" : "rotate-y-180",
        )}
      >
        <div className="backface-hidden rotate-y-180 absolute size-full bg-[url('/cards/back.jpg')] bg-cover" />
        <div
          className={cn(
            "backface-hidden transform-3d absolute size-full bg-cover",
            flip ? "rotate-z-180" : "",
          )}
          style={{
            backgroundImage: `url(/cards/${cardName}.jpg)`,
          }}
        />
      </div>
    </div>
  );
}

export function CardWithTitle(
  props: CardProps & { withAnimation?: boolean; delay?: number },
) {
  const [side, setSide] = useState<"front" | "back">(props.side);

  useEffect(() => {
    if (props.withAnimation && props.delay) {
      if (side === "back") {
        setTimeout(() => {
          setSide("front");
        }, props.delay);
      }
      if (side === "front") {
        setTimeout(() => {
          setSide("back");
        }, props.delay);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <Card {...props} side={side} />
      <p
        className={cn(
          "break-keep text-center",
          props.withAnimation ? "transition-opacity duration-300" : "",
          props.side === side ? "opacity-0" : "opacity-100",
        )}
      >
        {props.name} {props.flip ? "(역방향)" : ""}
      </p>
    </div>
  );
}
