import { z } from "zod";

export const verificationCodeSchema = z.object({
  verificationCode: z.string(),
});
