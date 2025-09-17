import { createFileRoute } from "@tanstack/react-router";

import { CardList } from "~/components/CardList";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-wrap justify-center gap-y-12 p-2">
      <CardList />
    </div>
  );
}
