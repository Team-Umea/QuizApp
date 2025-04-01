import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import UserForm from "./UserForm";
import SecurityQuestionForm from "./SecurityQuestionForm";
import VerificationCodeForm from "./VerificationCodeForm";
import PrimaryBtn from "../btn/PrimaryBtn";
import { signInFormSchema, SignInTypeEnum } from "../../validations/signIn";
import {
  requestVerificationCode,
  signIn,
  validateSecurityQuestion,
  verifyVerificationCode,
} from "../../api/authecho";
import PasswordForm from "./PasswordForm";
import useAuthStore from "../../hooks/useAuthStore";
import { useNavigate } from "react-router";

export default function SignInForm() {
  const navigate = useNavigate();
  const formMethods = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      signInType: SignInTypeEnum.User,
    },
  });
  const { updateIsAuthenticated, updateIsAdmin, updateUsername, updateEmail, updateUserID } =
    useAuthStore();
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { watch, getValues, setValue, setError, handleSubmit } = formMethods;

  const requestVerificationCodeMutation = useMutation({
    mutationFn: requestVerificationCode,
    onMutate: () => setIsLoading(true),
    onSuccess: (data) => {
      setSecurityQuestion(data.data.question);
      setSignInType(SignInTypeEnum.VerificationCode);
    },
    onError: (error) => {
      setError("user.user", { type: "manual", message: error.message });
    },
    onSettled: () => setIsLoading(false),
  });

  const verifyVerificationCodeMutation = useMutation({
    mutationFn: verifyVerificationCode,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      setValue("questionAnswer.questionAnswer", "");
      setSignInType(SignInTypeEnum.Password);
    },
    onError: () => {
      setValue("questionAnswer.questionAnswer", "");
      setSignInType(SignInTypeEnum.QuestionAnswer);
    },
    onSettled: () => setIsLoading(false),
  });

  const validateSecurityQuestionMutation = useMutation({
    mutationFn: validateSecurityQuestion,
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      setValue("verificationCode.verificationCode", "");
      setSignInType(SignInTypeEnum.VerificationCode);
    },
    onError: (error) => {
      setError("questionAnswer.questionAnswer", { type: "manual", message: error.message });
    },
    onSettled: () => setIsLoading(false),
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onMutate: () => setIsLoading(true),
    onSuccess: (data) => {
      const username = data.data.name;
      const email = data.data.email;
      const userID = data.data.userID;
      const isAdmin = data.data.isAppAdmin;

      updateIsAuthenticated(true);

      username && updateUsername(username);
      email && updateEmail(email);
      userID && updateUserID(userID);

      if (isAdmin) {
        updateIsAdmin(true);
        navigate("/admin");
      } else {
        navigate("/user");
      }
    },
    onError: (error) => {
      setError("password.password", { type: "manual", message: error.message });
    },
    onSettled: () => setIsLoading(false),
  });

  const signInType = watch("signInType");
  const signInTypeIsUser = signInType === "user";
  const signInTypeIsVerificationCode = signInType === "verificationCode";
  const signInTypeIsSecurityQuestion = signInType === "questionAnswer";
  const signInTypeIsPassword = signInType === "password";

  const setSignInType = (signInType) => {
    formMethods.setValue("signInType", signInType);
  };

  const onSubmit = () => {
    const data = getValues();
    let payload;

    switch (signInType) {
      case "user":
        payload = { user: data.user.user };

        requestVerificationCodeMutation.mutate(payload);
        break;
      case "verificationCode":
        payload = {
          user: data.user.user,
          verificationCode: data.verificationCode.verificationCode,
        };

        verifyVerificationCodeMutation.mutate(payload);
        break;
      case "questionAnswer":
        payload = {
          user: data.user.user,
          questionAnswer: data.questionAnswer.questionAnswer,
        };

        validateSecurityQuestionMutation.mutate(payload);
        break;
      case "password":
        payload = {
          user: data.user.user,
          verificationCode: data.verificationCode.verificationCode,
          password: data.password.password,
          rememberUser: true,
        };

        signInMutation.mutate(payload);
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader size={70} className="m-auto" color="white" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-[90%] max-w-[500px] px-6 pt-12 pb-6 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] bg-black">
          <div className="flex flex-col items-center pb-4 mb-4 border-b-[1px] border-slate-400 w-full">
            <a href="https://authecho.com" className="cursor-pointer">
              <img src="https://authecho.com/assets/authechoLogo-Bv1kmwoB.svg" alt="authecho" />
            </a>
            <p className="text-lg text-blue-300!">Logga in med ditt Authecho konto</p>
          </div>
          {signInTypeIsUser && <UserForm />}
          {signInTypeIsVerificationCode && <VerificationCodeForm />}
          {signInTypeIsSecurityQuestion && (
            <SecurityQuestionForm securityQuestion={securityQuestion} />
          )}
          {signInTypeIsPassword && <PasswordForm />}
          <div className="mt-22 w-full">
            <PrimaryBtn type="submit">
              <span className="text-lg font-medium">
                {signInTypeIsPassword ? "Logga in" : "Nästa"}
              </span>
            </PrimaryBtn>
          </div>
          <a
            href="https://authecho.com"
            target="_blank"
            className="mt-6 max-w-[90%] text-blue-400! cursor-pointer border-b-[1px] border-transparent transition-all duration-300 ease hover:border-blue-700">
            {signInTypeIsUser
              ? "Har du inget konto? Registrera dig här!"
              : "Glömt dina inloggningsuppgifter? Hantera ditt konto här"}
          </a>
        </form>
      </FormProvider>
    </div>
  );
}
