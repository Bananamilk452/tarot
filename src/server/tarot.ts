import { google } from "@ai-sdk/google";
import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";

import { TAROT_SPREADS } from "~/constant";
import { getTarotSystemPrompt, tarotUserPrompt } from "~/lib/tarot/prompt";

const createTarotResponseSchema = z.object({
  questions: z.array(z.string().min(5).max(2500)).min(1),
  cards: z.array(z.string()),
  spread: z.enum(Object.values(TAROT_SPREADS) as [string, ...string[]]),
});

const tarotReadingSchema = z.object({
  cards_meaning: z.string(),
  relevance: z.string(),
  conclusion: z.string(),
});

export const createTarotResponse = createServerFn({
  method: "POST",
})
  .validator((data: unknown) => {
    return createTarotResponseSchema.parse(data);
  })
  .handler(async (context) => {
    const { questions, cards, spread } = context.data;

    const { output } = await generateText({
      model: google("gemini-3.8-flash"),
      temperature: 0.6,
      system: getTarotSystemPrompt(spread),
      prompt: tarotUserPrompt({
        questions,
        cards: cards.map((card, index) => `${index + 1}. ${card}`).join("\n"),
        spread,
      }),
      output: Output.object({ schema: tarotReadingSchema }),
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingLevel: "low",
          },
        },
      },
    });

    return output;
  });
