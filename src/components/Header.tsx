import { useState } from "react";
import { useInterval } from "usehooks-ts";

export function Header() {
  const delay = 100;
  const [index, setIndex] = useState(0);
  const [isTransitionEnd, setIsTransitionEnd] = useState(false);
  const texts = [
    "ㅁ",
    "마",
    "마ㅂ",
    "마버",
    "마법",
    "마법ㅇ",
    "마법으",
    "마법의",
    "마법의 ",
    "마법의 ㅌ",
    "마법의 타",
    "마법의 타로",
    "마법의 타로",
    "마법의 타로",
  ];

  useInterval(
    () => {
      setIndex((val) => val + 1);
    },
    index === texts.length - 1 ? null : delay,
  );

  if (index === texts.length - 1 && !isTransitionEnd) {
    setIsTransitionEnd(true);
  }

  return (
    <header className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-6xl font-bold">{texts[index]}</h1>

      {isTransitionEnd && (
        <p className="whitespace-pre-line text-center text-lg">
          미래가 궁금한 고민, 상황이나 인간관계가 있나요? 마법의 타로가
          도와드릴게요.
        </p>
      )}
    </header>
  );
}
