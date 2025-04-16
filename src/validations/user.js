import { z } from "zod";

export const userSchema = z.object({
  user: z.string(),
});
