import { ChatVertexAI } from "@langchain/google-vertexai";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { TAROT_SPREADS } from "~/constant";
import { tarotPromptTemplate } from "~/lib/langchain/prompt";

const createTarotResponseSchema = z.object({
  question: z.string().min(5).max(2500),
  cards: z.array(z.string()),
  spread: z.enum(TAROT_SPREADS),
});

export const createTarotResponse = createServerFn({
  method: "POST",
})
  .validator((data: unknown) => {
    return createTarotResponseSchema.parse(data);
  })
  .handler(async (context) => {
    const { question, cards, spread } = context.data;

    const model = new ChatVertexAI({
      model: "gemini-2.5-flash",
      temperature: 0.6,
      thinkingBudget: 0,
    });

    const promptValue = await tarotPromptTemplate.invoke({
      question,
      cards: cards.join(", "),
      spread,
    });

    let text = (await model.invoke(promptValue)).text;
    text = text.replace("```json", "");
    text = text.replace("```", "");

    const response = JSON.parse(text) as {
      cards_meaning: string;
      relevance: string;
      conclusion: string;
    };

    return response;
  });
