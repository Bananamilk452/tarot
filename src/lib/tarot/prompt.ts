import { basePrompt } from "./base-prompt";
import { celticCrossPrompt } from "./celtic-cross-prompt";
import { oneCardPrompt } from "./one-card-prompt";
import { threeCardPrompt } from "./three-card-prompt";

export { basePrompt } from "./base-prompt";
export { celticCrossPrompt } from "./celtic-cross-prompt";
export { oneCardPrompt } from "./one-card-prompt";
export { threeCardPrompt } from "./three-card-prompt";

export function getTarotSystemPrompt(spread: string) {
  switch (spread) {
    case "원 카드 드로우":
      return `${basePrompt}\n\n${oneCardPrompt}`;
    case "쓰리 카드 스프레드":
      return `${basePrompt}\n\n${threeCardPrompt}`;
    case "켈틱 크로스 스프레드":
      return `${basePrompt}\n\n${celticCrossPrompt}`;
    default:
      throw new Error(`Unsupported tarot spread: ${spread}`);
  }
}

export function tarotUserPrompt({
  question,
  cards,
  spread,
}: {
  question: string;
  cards: string;
  spread: string;
}) {
  return `사용자 질문: ${question}\n뽑은 카드:\n${cards}\n스프레드 종류: ${spread}`;
}
