import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useTarotSession } from "../TarotSessionContext";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { Spread } from "~/constant";

const questionField = z
  .string()
  .min(5, "질문은 최소 5자 이상이어야 합니다.")
  .max(2500, "질문은 최대 2500자 이하여야 합니다.");

const questionSchema = z.object({
  question: questionField,
});

const eitherOrSchema = z.object({
  questionA: questionField,
  questionB: questionField,
});

const PLACEHOLDER = "미래가 궁금한 고민이나 상황, 인간관계 등을 상세하게 적어주세요";

export function QuestionForm() {
  const { spread } = useTarotSession();

  if (spread === Spread.EITHER_OR) {
    return <EitherOrForm />;
  }

  return <SingleQuestionForm />;
}

function SingleQuestionForm() {
  const { submitQuestions } = useTarotSession();
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: { question: "" },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-center sm:px-6"
        onSubmit={form.handleSubmit(({ question }) => submitQuestions([question]))}
      >
        <FormField
          name="question"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea className="h-36 resize-none" placeholder={PLACEHOLDER} {...field} />
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
  );
}

function EitherOrForm() {
  const { submitQuestions } = useTarotSession();
  const form = useForm<z.infer<typeof eitherOrSchema>>({
    resolver: zodResolver(eitherOrSchema),
    defaultValues: { questionA: "", questionB: "" },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-center gap-4 sm:px-6"
        onSubmit={form.handleSubmit(({ questionA, questionB }) =>
          submitQuestions([questionA, questionB]),
        )}
      >
        <p className="text-center text-sm break-keep">
          고민하고 있는 두 가지 선택을 각각 적어주세요. 첫 번째 카드는 선택 A, 두 번째 카드는 선택
          B의 결과를 보여줍니다.
        </p>
        <FormField
          name="questionA"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <p className="text-sm font-medium">선택 A</p>
              <FormControl>
                <Textarea
                  className="h-28 resize-none"
                  placeholder="첫 번째 선택지에 대한 고민을 적어주세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="questionB"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <p className="text-sm font-medium">선택 B</p>
              <FormControl>
                <Textarea
                  className="h-28 resize-none"
                  placeholder="두 번째 선택지에 대한 고민을 적어주세요"
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
  );
}
