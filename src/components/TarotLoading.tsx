import { useState } from "react";
import { useInterval } from "usehooks-ts";

import { TAROT_PHRASES } from "~/constant";
import { cn } from "~/utils";

import { Spinner } from "./Spinner";

export function TarotLoading({ className }: { className?: string }) {
  const [message, setMessage] = useState("당신의 운명을 읽고 있어요...");

  const interval = 5000;

  useInterval(() => {
    const randomIndex = Math.floor(Math.random() * TAROT_PHRASES.length);
    setMessage(TAROT_PHRASES[randomIndex]);
  }, interval);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <Spinner className="size-6" />
      <p className="whitespace-pre-wrap break-keep text-center italic">
        {message}
      </p>
    </div>
  );
}
