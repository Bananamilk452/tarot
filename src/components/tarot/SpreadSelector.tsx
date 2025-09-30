import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Spread } from "~/constant";
import { useCards } from "~/context/CardContext";

export function SpreadSelector() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-lg">보고 싶은 스프레드를 선택하세요.</p>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
        <SpreadCard
          spread={Spread.ONE_CARD}
          title="싱글 카드 드로우"
          description="한 장의 카드를 뽑아 오늘의 운세를 봅니다."
          content="가장 간단한 형태의 카드 드로우입니다. 한 장의 카드를 뽑아 오늘의 운세나 조언을 얻을 수 있습니다."
        />
        <SpreadCard
          spread={Spread.THREE_CARD}
          title="쓰리 카드 스프레드"
          description="과거, 현재, 미래를 나타내는 세 장의 카드를 뽑아 상황을 분석합니다."
          content="과거, 현재, 미래 또는 상황, 행동, 결과를 나타내는 세 장의 카드를 뽑아 상황을 분석합니다."
        />
        {/* <SpreadCard
          spread={Spread.CELTIC_CROSS}
          title="켈틱 크로스 스프레드"
          description="열 장의 카드를 뽑아 복잡한 상황을 깊이 있게 분석합니다."
          content="열 장의 카드를 뽑아 복잡한 상황을 깊이 있게 분석합니다. 각 카드가 특정한 위치와 의미를 가지며, 전체적인 이야기를 형성합니다."
        /> */}
      </div>
    </div>
  );
}

function SpreadCard({
  spread,
  title,
  description,
  content,
}: {
  spread: Spread;
  title: string;
  description: string;
  content: string;
}) {
  const { setSpread, spread: currentSpread } = useCards();

  return (
    <Card
      onClick={() => setSpread(spread)}
      data-active={currentSpread === spread || undefined}
      className="data-active:border-amber-100 data-active:border-2 data-active:shadow-[0_0_15px_#fde68a] cursor-pointer transition-all"
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="break-keep text-sm">{content}</p>
      </CardContent>
    </Card>
  );
}
