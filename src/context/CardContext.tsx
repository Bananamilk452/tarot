import { createContext, useContext, useMemo, useState } from "react";

import { Spread, TAROT_CARDS } from "~/constant";
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
  spread: Spread;
  includeReverse: boolean;
  handleCardClick: (index: number, name: string, flip: boolean) => void;
  redoSelection: () => void;
  isSelected: (index: number) => boolean;
  setSelection: (selection: CardSelection[]) => void;
  setQuestion: (question: string) => void;
  setPageState: (pageState: "initial" | "questioned" | "started") => void;
  setSpread: (spread: Spread) => void;
  setIncludeReverse: (include: boolean) => void;
  reset: () => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  // cards 초기화용 state
  const [resetState, setResetState] = useState(0);

  const [includeReverse, setIncludeReverse] = useState(true);

  // reset() 함수가 호출될 때마다 resetState를 변경하여 cards를 재생성
  const cards = useMemo(
    () =>
      shuffleArray(TAROT_CARDS).map((card) => ({
        name: card,
        flip: includeReverse ? Math.random() < 0.5 : false,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resetState, includeReverse],
  );
  const [selection, setSelection] = useState<CardSelection[]>([]);
  const [limit, setLimit] = useState(1);
  const [question, setQuestion] = useState("");
  const [pageState, setPageState] = useState<
    "initial" | "questioned" | "started"
  >("initial");
  const [spread, setSpread] = useState<Spread>(Spread.ONE_CARD);

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
    setQuestion("");
    setPageState("initial");
    setSpread(Spread.ONE_CARD);
  }

  function selectSpread(spread: Spread) {
    setSpread(spread);
    switch (spread) {
      case Spread.ONE_CARD: {
        setLimit(1);
        break;
      }
      case Spread.THREE_CARD: {
        setLimit(3);
        break;
      }
      case Spread.CELTIC_CROSS: {
        setLimit(10);
        break;
      }
      default: {
        setLimit(1);
        break;
      }
    }
  }

  return (
    <CardContext.Provider
      value={{
        cards,
        selection,
        limit,
        question,
        pageState,
        spread,
        includeReverse,
        handleCardClick,
        redoSelection,
        isSelected,
        setSelection,
        setQuestion,
        setPageState,
        setSpread: selectSpread,
        setIncludeReverse,
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
