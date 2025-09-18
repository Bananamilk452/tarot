import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useToggle } from "usehooks-ts";
import { z } from "zod";

import { CardList } from "~/components/CardList";
import { Header } from "~/components/Header";
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
  const { limit, setLimit, selection } = useCards();
  setLimit(1);

  const [isVisible, toggleIsVisible] = useToggle(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toggleIsVisible();
  }

  return (
    <>
      <div className="mx-auto flex flex-col justify-center gap-6 p-12 md:w-1/2 lg:w-3/5">
        <Header />

        {!isVisible && (
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
        )}

        {isVisible && (
          <div className="flex flex-col items-center gap-4">
            <p className="break-keep text-center text-lg">
              질문: {form.getValues("question")}
            </p>

            <p className="break-keep text-center text-lg">
              원하는 카드를 1장 골라주세요.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="p-4">
          <CardList isVisible={isVisible} />
        </div>
        <div className="flex justify-center gap-4">
          <Button variant="outline" disabled={selection.length < 1}>
            한 장 선택 취소
          </Button>
          <Button disabled={selection.length !== limit}>카드 선택 완료</Button>
        </div>
      </div>
    </>
  );
}
