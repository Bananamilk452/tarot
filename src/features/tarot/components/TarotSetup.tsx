import { useTarotSession } from "../TarotSessionContext";
import { QuestionForm } from "./QuestionForm";
import { SpreadSelector } from "~/components/tarot/SpreadSelector";
import { Checkbox } from "~/components/ui/checkbox";

export function TarotSetup() {
  const { includeReverse, setIncludeReverse } = useTarotSession();

  return (
    <>
      <SpreadSelector />
      <div className="flex items-center justify-center gap-2">
        <label>역방향 카드 포함하기</label>
        <Checkbox onCheckedChange={setIncludeReverse} checked={includeReverse} />
      </div>
      <QuestionForm />
    </>
  );
}
