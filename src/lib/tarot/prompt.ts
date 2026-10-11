import { basePrompt } from "./base-prompt";
import { celticCrossPrompt } from "./celtic-cross-prompt";
import { eitherOrPrompt } from "./either-or-prompt";
import { oneCardPrompt } from "./one-card-prompt";
import { threeCardPrompt } from "./three-card-prompt";

export { basePrompt } from "./base-prompt";
export { celticCrossPrompt } from "./celtic-cross-prompt";
export { eitherOrPrompt } from "./either-or-prompt";
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
    case "양자택일":
      return `${basePrompt}\n\n${eitherOrPrompt}`;
    default:
      throw new Error(`Unsupported tarot spread: ${spread}`);
  }
}

export function tarotUserPrompt({
  questions,
  cards,
  spread,
}: {
  questions: string[];
  cards: string;
  spread: string;
}) {
  const questionSection =
    questions.length > 1
      ? questions
          .map((question, index) => `질문 ${String.fromCharCode(65 + index)}: ${question}`)
          .join("\n")
      : `사용자 질문: ${questions[0]}`;

  return `${questionSection}\n뽑은 카드:\n${cards}\n스프레드 종류: ${spread}`;
}
