import { createContext, useContext, useState } from "react";

import { SPREAD_CARD_LIMITS } from "./types";
import { Spread, TAROT_CARDS } from "~/constant";
import { shuffleArray } from "~/utils";

import type { CardSelection, TarotCard, TarotStep } from "./types";

interface TarotSessionContextValue {
  cards: TarotCard[];
  selection: CardSelection[];
  questions: string[];
  step: TarotStep;
  spread: Spread;
  includeReverse: boolean;
  limit: number;
  selectCard: (index: number, card: TarotCard) => void;
  undoSelection: () => void;
  isSelected: (index: number) => boolean;
  setSpread: (spread: Spread) => void;
  setIncludeReverse: (include: boolean) => void;
  submitQuestions: (questions: string[]) => void;
  completeSelection: () => void;
  reset: () => void;
}

const TarotSessionContext = createContext<TarotSessionContextValue | undefined>(undefined);

function createShuffledCards(includeReverse: boolean): TarotCard[] {
  return shuffleArray(TAROT_CARDS).map((name) => ({
    name,
    flip: includeReverse ? Math.random() < 0.5 : false,
  }));
}

export function TarotSessionProvider({ children }: { children: React.ReactNode }) {
  const [includeReverse, setIncludeReverse] = useState(true);
  const [cards, setCards] = useState(() => createShuffledCards(true));
  const [selection, setSelection] = useState<CardSelection[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [step, setStep] = useState<TarotStep>("setup");
  const [spread, setSpread] = useState<Spread>(Spread.ONE_CARD);

  const limit = SPREAD_CARD_LIMITS[spread];

  function selectCard(index: number, card: TarotCard) {
    if (selection.length >= limit || selection.some((selected) => selected.index === index)) {
      return;
    }

    setSelection((current) => [...current, { index, ...card }]);
  }

  function undoSelection() {
    setSelection((current) => current.slice(0, -1));
  }

  function isSelected(index: number) {
    return selection.some((selected) => selected.index === index);
  }

  function submitQuestions(nextQuestions: string[]) {
    setQuestions(nextQuestions);
    setStep("selecting");
  }

  function updateIncludeReverse(include: boolean) {
    setIncludeReverse(include);
    setCards(createShuffledCards(include));
  }

  function completeSelection() {
    if (selection.length === limit) {
      setStep("reading");
    }
  }

  function reset() {
    setCards(createShuffledCards(includeReverse));
    setSelection([]);
    setQuestions([]);
    setStep("setup");
    setSpread(Spread.ONE_CARD);
  }

  return (
    <TarotSessionContext.Provider
      value={{
        cards,
        selection,
        questions,
        step,
        spread,
        includeReverse,
        limit,
        selectCard,
        undoSelection,
        isSelected,
        setSpread,
        setIncludeReverse: updateIncludeReverse,
        submitQuestions,
        completeSelection,
        reset,
      }}
    >
      {children}
    </TarotSessionContext.Provider>
  );
}

export function useTarotSession() {
  const context = useContext(TarotSessionContext);
  if (context === undefined) {
    throw new Error("useTarotSession must be used within a TarotSessionProvider");
  }
  return context;
}
