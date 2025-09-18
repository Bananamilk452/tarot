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

  const gap = 100;
  const delay = 50;

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
            isTransitionEnd ? "transition-all hover:translate-y-6" : "",
            isSelected(i)
              ? "translate-y-10 transition-all hover:translate-y-10"
              : "",
          )}
          style={{
            transitionDelay: isTransitionEnd ? "" : `${delay * i}ms`,
          }}
          onClick={() => handleCardClick(i, card.name, card.flip)}
        />
      ))}
    </div>
  );
}
