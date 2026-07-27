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

export const CELTIC_CROSS_POSITIONS = [
  { title: "현재 상황", gridClass: "md:col-start-2 md:row-start-2" },
  { title: "도전 또는 방해 요소", gridClass: "md:col-start-3 md:row-start-2" },
  { title: "무의식적 기반", gridClass: "md:col-start-2 md:row-start-3" },
  { title: "과거", gridClass: "md:col-start-1 md:row-start-2" },
  { title: "의식적 목표 또는 최상의 가능성", gridClass: "md:col-start-2 md:row-start-1" },
  { title: "가까운 미래", gridClass: "md:col-start-4 md:row-start-2" },
  { title: "질문자의 태도", gridClass: "md:col-start-6 md:row-start-4" },
  { title: "외부 환경", gridClass: "md:col-start-6 md:row-start-3" },
  { title: "희망과 두려움", gridClass: "md:col-start-6 md:row-start-2" },
  { title: "최종 결과", gridClass: "md:col-start-6 md:row-start-1" },
] as const;
