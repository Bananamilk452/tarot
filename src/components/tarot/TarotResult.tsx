import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { CardWithTitle } from "../Card";
import { TarotLoading } from "../TarotLoading";
import { Button } from "../ui/button";
import { Spread, TAROT_SPREADS } from "~/constant";
import { useTarotSession } from "~/features/tarot/TarotSessionContext";
import { CELTIC_CROSS_POSITIONS } from "~/features/tarot/types";
import { createTarotResponse } from "~/server/tarot";

export function TarotResult() {
  const [showLoading, setShowLoading] = useState(false);

  const { question, selection, reset, spread } = useTarotSession();
  const delay = 1000;

  const {
    data,
    mutate: getTarotReading,
    status,
  } = useMutation({
    mutationFn: async (data: { question: string; cards: string[]; spread: string }) => {
      return await createTarotResponse({ data: data });
    },
  });

  useEffect(() => {
    getTarotReading({
      question,
      cards: selection.map((card) => `${card.name} (${card.flip ? "역방향" : "정방향"})`),
      spread: TAROT_SPREADS[spread],
    });

    const timerId = setTimeout(() => {
      setShowLoading(true);
    }, delay);
    return () => clearTimeout(timerId);
    // oxlint-disable-next-line react/exhaustive-deps
  }, []);

  const renderCards = () => {
    if (spread === Spread.ONE_CARD) {
      return (
        <CardWithTitle
          name={selection[0].name}
          side="back"
          flip={selection[0].flip}
          withAnimation
          delay={delay}
        />
      );
    }

    if (spread === Spread.THREE_CARD) {
      return (
        <div className="flex flex-row flex-wrap items-center justify-center gap-6">
          {selection.map((card, index) => (
            <CardWithTitle
              key={card.index}
              name={card.name}
              side="back"
              flip={card.flip}
              withAnimation
              delay={delay + index * 500}
            />
          ))}
        </div>
      );
    }

    if (spread === Spread.CELTIC_CROSS) {
      return (
        <div className="mx-12 grid grid-cols-2 items-center gap-x-2 gap-y-6 px-4 md:grid-cols-6 md:gap-x-3 md:gap-y-6">
          {selection.map((card, index) => {
            const position = CELTIC_CROSS_POSITIONS[index];

            return (
              <div
                key={card.index}
                className={`relative flex flex-col items-center gap-2 ${position.gridClass} ${index === 1 ? "md:z-10" : ""}`}
              >
                <p className="text-center text-sm break-keep">
                  {index + 1}. {position.title}
                </p>
                <CardWithTitle
                  name={card.name}
                  side="back"
                  flip={card.flip}
                  withAnimation
                  delay={delay + index * 500}
                  className="w-18 sm:w-20"
                />
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col flex-wrap items-center gap-6">
      {renderCards()}

      {showLoading && (
        <>
          <TarotLoading
            className={
              status === "pending"
                ? "opacity-100 transition-opacity duration-500"
                : "hidden opacity-0 transition-opacity"
            }
          />
          {status === "success" && (
            <>
              <div className="p-4 md:w-4/5 lg:w-1/2">
                <h2 className="mb-1 text-lg font-semibold">카드의 의미</h2>
                <p className="break-keep whitespace-pre-wrap">{data.cards_meaning}</p>

                <hr className="my-6 border-gray-600" />

                <h2 className="mb-1 text-lg font-semibold">질문과 카드의 관련성</h2>
                <p className="break-keep whitespace-pre-wrap">{data.relevance}</p>

                <hr className="my-6 border-gray-600" />

                <h2 className="mb-1 text-lg font-semibold">결론</h2>
                <p className="break-keep whitespace-pre-wrap">{data.conclusion}</p>
              </div>
              <Button onClick={reset}>다시 하기</Button>
            </>
          )}
          {status === "error" && (
            <>
              <div>오류가 발생했어요. 다시 시도해주세요.</div>
              <Button className="mt-4" onClick={reset}>
                다시 하기
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
}
