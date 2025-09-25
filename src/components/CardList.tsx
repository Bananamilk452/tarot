import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

import { useCards } from "~/context/CardContext";
import { cn } from "~/utils";

import { Card } from "./Card";

interface CardListProps {
  isVisible: boolean;
}

export function CardList({ isVisible }: CardListProps) {
  const { cards, handleCardClick, isSelected } = useCards();
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const delay = 25;

  function handleLineWrapping() {
    cardsRefs.current.forEach((card) => {
      if (card) {
        card.removeAttribute("data-newline");
      }
    });

    let lastTop = -1;

    cardsRefs.current.forEach((card) => {
      if (card) {
        const currentTop = card.offsetTop;
        if (currentTop !== lastTop) {
          card.setAttribute("data-newline", "true");
          lastTop = currentTop;
        }
      }
    });
  }

  useLayoutEffect(() => {
    handleLineWrapping();
  }, []);

  useEventListener("resize", handleLineWrapping);

  const [isTransitionEnd, setIsTransitionEnd] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isVisible) {
      setIsTransitionEnd(false);
      timerId = setTimeout(() => {
        setIsTransitionEnd(true);
        handleLineWrapping();
      }, delay * cards.length);
    } else {
      setIsTransitionEnd(false);
    }
    return () => clearTimeout(timerId);
  }, [isVisible, cards.length]);

  return (
    <div className="flex flex-wrap justify-center gap-y-12 p-2">
      {cards.map((card, i) => (
        <Card
          key={i}
          name={card.name}
          side="back"
          flip={card.flip}
          ref={(el: HTMLDivElement | null) => {
            cardsRefs.current[i] = el;
          }}
          className={cn(
            isVisible ? "opacity-100" : "opacity-0",
            isTransitionEnd ? "transition-all sm:hover:translate-y-6" : "",
            "data-selected:translate-y-10 data-selected:transition-all data-selected:hover:translate-y-10",
            "data-selected:border-2 data-selected:border-amber-100 data-selected:shadow-[0_0_15px_#fde68a]",
          )}
          data-selected={isSelected(i) || undefined}
          style={{
            transitionDelay: isTransitionEnd ? "" : `${delay * i}ms`,
          }}
          onClick={() => handleCardClick(i, card.name, card.flip)}
        />
      ))}
    </div>
  );
}
