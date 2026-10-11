import { useTarotSession } from "../TarotSessionContext";
import { SELECTION_INSTRUCTIONS } from "../types";
import { TAROT_SPREADS } from "~/constant";

export function SelectionStatus() {
  const { questions, spread, step } = useTarotSession();
  const message = step === "reading" ? "선택한 카드를 펼쳐볼게요." : SELECTION_INSTRUCTIONS[spread];

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-center text-lg break-keep">스프레드: {TAROT_SPREADS[spread]}</p>
      {questions.map((question, index) => (
        <p key={index} className="text-center text-lg break-keep">
          {questions.length > 1 ? `질문 ${String.fromCharCode(65 + index)}: ` : "질문: "}
          {question}
        </p>
      ))}
      <p className="text-center text-lg break-keep">{message}</p>
    </div>
  );
}
