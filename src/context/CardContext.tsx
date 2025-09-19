import { createContext, useContext, useMemo, useState } from "react";

import { TAROT_CARDS } from "~/constant";
import { shuffleArray } from "~/utils";

interface CardSelection {
  index: number;
  name: string;
  flip: boolean;
}

interface CardContextType {
  cards: { name: string; flip: boolean }[];
  selection: CardSelection[];
  limit: number;
  question: string;
  pageState: "initial" | "questioned" | "started";
  handleCardClick: (index: number, name: string, flip: boolean) => void;
  redoSelection: () => void;
  isSelected: (index: number) => boolean;
  setSelection: React.Dispatch<React.SetStateAction<CardSelection[]>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  setPageState: React.Dispatch<
    React.SetStateAction<"initial" | "questioned" | "started">
  >;
  reset: () => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  // cards 초기화용 state
  const [resetState, setResetState] = useState(0);
  // reset() 함수가 호출될 때마다 resetState를 변경하여 cards를 재생성

  const cards = useMemo(
    () =>
      shuffleArray(TAROT_CARDS).map((card) => ({
        name: card,
        flip: Math.random() < 0.5,
      })),
    [resetState],
  );
  const [selection, setSelection] = useState<CardSelection[]>([]);
  const [limit, setLimit] = useState(1);
  const [question, setQuestion] = useState("");
  const [pageState, setPageState] = useState<
    "initial" | "questioned" | "started"
  >("initial");

  function handleCardClick(index: number, name: string, flip: boolean) {
    if (selection.length >= limit) {
      return;
    }
    setSelection((prev) => [...prev, { index, name, flip }]);
  }

  function redoSelection() {
    setSelection((prev) => prev.slice(0, -1));
  }

  function isSelected(index: number) {
    return selection.some((sel) => sel.index === index);
  }

  function reset() {
    setResetState((prev) => prev + 1);
    setSelection([]);
    setLimit(1);
    setQuestion("");
    setPageState("initial");
  }

  return (
    <CardContext.Provider
      value={{
        cards,
        selection,
        limit,
        question,
        pageState,
        handleCardClick,
        redoSelection,
        isSelected,
        setSelection,
        setLimit,
        setQuestion,
        setPageState,
        reset,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCards() {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCards must be used within a CardProvider");
  }
  return context;
}
