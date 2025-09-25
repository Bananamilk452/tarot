import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CardList } from "~/components/CardList";
import { Header } from "~/components/Header";
import { TarotResult } from "~/components/tarot/TarotResult";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { useCards } from "~/context/CardContext";

export const Route = createFileRoute("/")({
  component: Home,
});

const formSchema = z.object({
  question: z
    .string()
    .min(5, "질문은 최소 5자 이상이어야 합니다.")
    .max(2500, "질문은 최대 2500자 이하여야 합니다."),
});

function Home() {
  const {
    limit,
    setLimit,
    selection,
    pageState,
    redoSelection,
    question,
    setQuestion,
    setPageState,
    reset,
  } = useCards();
  setLimit(1);

  const [message, setMessage] = useState("");

  function onStart() {
    setPageState("started");
    setMessage("선택한 카드를 펼쳐볼게요.");
  }

  return (
    <div className="py-12">
      <div className="mx-auto flex flex-col justify-center gap-6 p-8 pb-8 sm:p-12 md:w-4/5 lg:w-1/2">
        <Header />

        {/* 질문 넣는 곳 */}
        {pageState === "initial" && (
          <QuestionForm
            setMessage={setMessage}
            setQuestion={setQuestion}
            onStart={() => setPageState("questioned")}
          />
        )}

        {/* 현재 질문 & 메세지 출력하는 곳 */}
        {pageState !== "initial" && (
          <div className="flex flex-col items-center gap-4">
            <p className="break-keep text-center text-lg">질문: {question}</p>
            <p className="break-keep text-center text-lg">{message}</p>
          </div>
        )}
      </div>

      {/* 타로 카드 공개하는 곳 */}
      {pageState === "started" && <TarotResult />}

      {/* 타로 카드 뽑는 곳 */}
      <div className="flex flex-col gap-10">
        {pageState !== "started" && (
          <div className="px-2 sm:p-4">
            <CardList isVisible={pageState === "questioned"} />
          </div>
        )}
        {pageState === "questioned" && (
          <div className="flex flex-wrap justify-center gap-4 px-4">
            <Button variant="outline" onClick={reset}>
              질문 다시하기
            </Button>
            <Button
              variant="outline"
              disabled={selection.length === 0}
              onClick={redoSelection}
            >
              한 장 선택 취소
            </Button>
            <Button disabled={selection.length !== limit} onClick={onStart}>
              카드 선택 완료
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface QuestionFormProps {
  setMessage: (msg: string) => void;
  setQuestion: (question: string) => void;
  onStart: () => void;
}

function QuestionForm({ setMessage, setQuestion, onStart }: QuestionFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setQuestion(values.question);
    setMessage("원하는 카드를 1장 골라주세요.");
    onStart();
  }

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col justify-center sm:px-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="question"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="h-36 resize-none"
                    placeholder="미래가 궁금한 고민이나 상황, 인간관계 등을 상세하게 적어주세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" className="mt-4">
              타로 카드 뽑기
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
