import { createContext, useContext, useState } from "react";

import { TAROT_CARDS } from "~/constant";

interface CardSelection {
  index: number;
  card: string;
}

interface CardContextType {
  cards: string[];
  selection: CardSelection[];
  limit: number;
  handleCardClick: (index: number, card: string) => void;
  redoSelection: () => void;
  isSelected: (index: number) => boolean;
  setSelection: React.Dispatch<React.SetStateAction<CardSelection[]>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const cards = TAROT_CARDS;
  const [selection, setSelection] = useState<CardSelection[]>([]);
  const [limit, setLimit] = useState(1);

  function handleCardClick(index: number, card: string) {
    if (selection.length >= limit) {
      return;
    }
    setSelection((prev) => [...prev, { index, card }]);
  }

  function redoSelection() {
    setSelection((prev) => prev.slice(0, -1));
  }

  function isSelected(index: number) {
    return selection.some((sel) => sel.index === index);
  }

  return (
    <CardContext.Provider
      value={{
        cards,
        selection,
        limit,
        handleCardClick,
        redoSelection,
        isSelected,
        setSelection,
        setLimit,
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
