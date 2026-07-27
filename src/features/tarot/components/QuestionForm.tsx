import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useTarotSession } from "../TarotSessionContext";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

const questionSchema = z.object({
  question: z
    .string()
    .min(5, "질문은 최소 5자 이상이어야 합니다.")
    .max(2500, "질문은 최대 2500자 이하여야 합니다."),
});

export function QuestionForm() {
  const { submitQuestion } = useTarotSession();
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: { question: "" },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-center sm:px-6"
        onSubmit={form.handleSubmit(({ question }) => submitQuestion(question))}
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
  );
}
