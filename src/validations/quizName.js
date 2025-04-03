import { z } from "zod";

export const quizNameSchema = z.object({
  quizName: z
    .string({ message: "Quiz name is required" })
    .nonempty({ message: "Quiz name cannot be empty" })
    .min(3, { message: "Quiz name must be atleast 3 characters" })
    .max(50, { message: "Quiz name cannot be longer than 50 characters" }),
});
