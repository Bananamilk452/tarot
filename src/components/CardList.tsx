import { useRef } from "react";
import { useEventListener } from "usehooks-ts";

import { Card } from "./Card";

export function CardList() {
  const cards = Array.from({ length: 78 });
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const gap = 100;

  function handleLineWrapping() {
    cardsRefs.current.forEach((card) => {
      if (card) {
        card.style.marginLeft = `-${gap}px`;
      }
    });

    let lastTop = -1;

    cardsRefs.current.forEach((card) => {
      if (card) {
        const currentTop = card.offsetTop;
        if (currentTop !== lastTop) {
          card.style.marginLeft = "0px";
          lastTop = currentTop;
        }
      }
    });
  }

  useEventListener("resize", handleLineWrapping);

  return (
    <div className="flex flex-wrap justify-center gap-y-12 p-2">
      {cards.map((_, i) => (
        <Card
          key={i}
          ref={(el: HTMLDivElement | null) => {
            cardsRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}
