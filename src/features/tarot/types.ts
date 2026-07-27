import { Spread } from "~/constant";

export type TarotStep = "setup" | "selecting" | "reading";

export interface TarotCard {
  name: string;
  flip: boolean;
}

export interface CardSelection extends TarotCard {
  index: number;
}

export const SPREAD_CARD_LIMITS: Record<Spread, number> = {
  [Spread.ONE_CARD]: 1,
  [Spread.THREE_CARD]: 3,
  [Spread.CELTIC_CROSS]: 10,
};

export const SELECTION_INSTRUCTIONS: Record<Spread, string> = {
  [Spread.ONE_CARD]: "원하는 카드를 1장 골라주세요.",
  [Spread.THREE_CARD]: "과거, 현재, 미래를 나타내는 카드를 순서대로 1장씩 골라주세요.",
  [Spread.CELTIC_CROSS]: "각 위치를 나타내는 카드를 순서대로 1장씩 골라주세요.",
};
