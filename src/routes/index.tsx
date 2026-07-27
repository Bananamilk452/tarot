import { createFileRoute } from "@tanstack/react-router";

import { Header } from "~/components/Header";
import { TarotResult } from "~/components/tarot/TarotResult";
import { CardSelection } from "~/features/tarot/components/CardSelection";
import { SelectionStatus } from "~/features/tarot/components/SelectionStatus";
import { TarotSetup } from "~/features/tarot/components/TarotSetup";
import { TarotSessionProvider, useTarotSession } from "~/features/tarot/TarotSessionContext";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <TarotSessionProvider>
      <TarotPage />
    </TarotSessionProvider>
  );
}

function TarotPage() {
  const { step } = useTarotSession();

  return (
    <div className="py-12">
      <div className="mx-auto flex flex-col justify-center gap-6 p-8 !pb-8 sm:p-12 md:w-4/5 lg:w-1/2">
        <Header />
      </div>
      <div className="mx-auto flex flex-col justify-center gap-6 p-4 md:w-4/5 lg:w-3/5">
        {step === "setup" ? <TarotSetup /> : <SelectionStatus />}
      </div>

      {step === "selecting" ? <CardSelection /> : null}
      {step === "reading" ? <TarotResult /> : null}
    </div>
  );
}
