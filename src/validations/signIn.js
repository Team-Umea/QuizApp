import { z } from "zod";
import { securityQuestionSchema } from "./securityQuestion";
import { verificationCodeSchema } from "./verificationCode";
import { passwordSchema } from "./password";
import { userSchema } from "./user";

export const SignInTypeEnum = {
  User: "user",
  VerificationCode: "verificationCode",
  QuestionAnswer: "questionAnswer",
  Password: "password",
};

export const signInFormSchema = z.discriminatedUnion("signInType", [
  z.object({
    signInType: z.literal(SignInTypeEnum.User),
    user: userSchema,
  }),
  z.object({
    signInType: z.literal(SignInTypeEnum.VerificationCode),
    verificationCode: verificationCodeSchema,
  }),
  z.object({
    signInType: z.literal(SignInTypeEnum.QuestionAnswer),
    questionAnswer: securityQuestionSchema,
  }),
  z.object({
    signInType: z.literal(SignInTypeEnum.Password),
    password: passwordSchema,
  }),
]);
