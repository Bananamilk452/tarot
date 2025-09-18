import { createFileRoute } from "@tanstack/react-router";

import { Header } from "~/components/Header";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex justify-center p-12">
      <Header />
    </div>
  );
}
