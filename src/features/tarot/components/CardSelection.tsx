import { useTarotSession } from "../TarotSessionContext";
import { CardList } from "~/components/CardList";
import { Button } from "~/components/ui/button";

export function CardSelection() {
  const { completeSelection, limit, reset, selection, undoSelection } = useTarotSession();

  return (
    <div className="flex flex-col gap-10">
      <div className="px-2 sm:p-4">
        <CardList isVisible />
      </div>
      <div className="flex flex-wrap justify-center gap-4 px-4">
        <Button variant="outline" onClick={reset}>
          질문 다시하기
        </Button>
        <Button variant="outline" disabled={selection.length === 0} onClick={undoSelection}>
          한 장 선택 취소
        </Button>
        <Button disabled={selection.length !== limit} onClick={completeSelection}>
          카드 선택 완료
        </Button>
      </div>
    </div>
  );
}
