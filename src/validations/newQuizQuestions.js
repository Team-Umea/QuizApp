import { z } from "zod";

export const newQuizquestionSchema = z.object({
  id: z.string().nonempty("Id cannot be empty"),
  question: z
    .string()
    .nonempty("Question is required")
    .min(10, "At least 10 characters are required")
    .max(200, "Maximum 200 characters are allowed"),
  options: z
    .array(z.any())
    .refine(
      (options) =>
        options.length >= 2 &&
        options.filter((opt) => opt).length >= 2 &&
        options.every((opt) => (opt ? opt.length <= 50 : true)),
      {
        message: "At least 2 options are required and options cannot be longer than 50 characters",
      }
    ),
  answers: z.array(z.any()).refine((answers) => answers.length > 0, {
    message: "At least one answer must be provided",
  }),
});
