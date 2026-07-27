import { google } from "@ai-sdk/google";
import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";

import { TAROT_SPREADS } from "~/constant";
import { systemPrompt, tarotUserPrompt } from "~/lib/tarot/prompt";

const createTarotResponseSchema = z.object({
  question: z.string().min(5).max(2500),
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
    const { question, cards, spread } = context.data;

    const { output } = await generateText({
      model: google("gemini-3.6-flash"),
      temperature: 0.6,
      system: systemPrompt,
      prompt: tarotUserPrompt({
        question,
        cards: cards.join(", "),
        spread,
      }),
      output: Output.object({ schema: tarotReadingSchema }),
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingLevel: "medium",
          },
        },
      },
    });

    return output;
  });
