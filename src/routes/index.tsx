import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CardList } from "~/components/CardList";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-wrap justify-center gap-y-12 p-2">
      <Button onClick={() => setIsVisible((val) => !val)}>
        Change Visibility
      </Button>
      <CardList isVisible={isVisible} />
    </div>
  );
}
