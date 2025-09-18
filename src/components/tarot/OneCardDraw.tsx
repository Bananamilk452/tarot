import { useCards } from "~/context/CardContext";

import { CardWithTitle } from "../Card";

export function OneCardDraw() {
  const { selection } = useCards();

  return (
    <div className="flex flex-col flex-wrap items-center gap-6">
      <CardWithTitle
        name={selection[0].name}
        side="back"
        flip={selection[0].flip}
        withAnimation
        delay={1000}
      />
    </div>
  );
}
