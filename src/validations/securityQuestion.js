import { z } from "zod";

export const securityQuestionSchema = z.object({
  questionAnswer: z.string(),
});
