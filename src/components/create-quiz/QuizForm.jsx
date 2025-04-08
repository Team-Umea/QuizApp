import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import OptionCard from "./OptionCard";
import OutlineBtn from "../btn/OutlineBtn";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FormInputBox from "../form/FormInputBox";
import { useQuestionContext } from "../../context/CreateQuizContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { newQuizquestionSchema } from "../../validations/newQuizQuestions";
import { extractEndValues, generateID, hasDuplicates } from "../../utils/helpers";
import useScrollTo from "../../hooks/useScrollTo";
import { useEffect } from "react";
import DefaultBtn from "../btn/DefaultBtn";
import DeleteBtn from "../btn/DeleteBtn";
import QuizNameForm from "./QuizNameForm";
import { useMutation } from "@tanstack/react-query";
import { watchQuiz } from "../../api/api";
import { useNavigate, useParams } from "react-router";

export const OPTION_COLORS = ["#02c228", "#05c8eb", "#cf6006", "#cf0606"];

export default function QuizForm() {
  const navigate = useNavigate();
  const { quiz } = useParams();
  const { questionState, setQuestionState } = useQuestionContext();
  const { scrollToTopSmooth } = useScrollTo();
  const formMethods = useForm({
    resolver: zodResolver(newQuizquestionSchema),
    defaultValues: questionState.editingQuestion
      ? { ...questionState.editingQuestion }
      : {
          id: generateID(questionState.questions),
          question: "",
          options: ["", "", "", ""],
          answers: [0],
        },
  });

  const {
    control,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = formMethods;

  const watchQuizMutation = useMutation({
    mutationFn: watchQuiz,
    onSuccess: (data) => {
      setQuestionState((prev) => ({ ...prev, quizId: data._id }));
    },
  });

  const isEditing = questionState.editingQuestion;

  useEffect(() => {
    reset(
      questionState.editingQuestion
        ? { ...questionState.editingQuestion }
        : {
            id: generateID(questionState.questions),
            question: "",
            options: ["", "", "", ""],
            answers: [0],
          }
    );
  }, [isEditing]);

  const deleteQuestion = () => {
    const currentId = getValues("id");
    const filteredQuestions = questionState.questions.filter(
      (question) => question.id !== currentId
    );

    const quizData = { ...questionState, questions: filteredQuestions };

    watchQuizMutation.mutate(quizData);

    updateQuizPath(filteredQuestions);

    reset({
      id: generateID(questionState.questions),
      question: "",
      options: ["", "", "", ""],
      answers: [0],
    });

    setQuestionState((prev) => ({ ...prev, questions: filteredQuestions, editingQuestion: null }));
  };

  const cancelEdit = () => {
    setQuestionState((prev) => ({ ...prev, editingQuestion: null }));
    reset({
      id: generateID(questionState.questions),
      question: "",
      options: ["", "", "", ""],
      answers: [0],
    });
  };

  const updateQuizPath = (ques) => {
    const currentQuizDataPath = quiz ? JSON.parse(decodeURIComponent(quiz)) : null;
    const quizAsPath = encodeURIComponent(
      JSON.stringify({ ...currentQuizDataPath, questions: ques })
    );
    const path = `/admin/createquiz/${quizAsPath}`;
    navigate(path);
  };

  const onSubmit = (data) => {
    clearErrors("root");

    const duplicateOptions = hasDuplicates(data.options.filter((opt) => opt));

    if (duplicateOptions) {
      setError("root", {
        type: "manual",
        message: "Options must be unique",
      });
      scrollToTopSmooth();
      return;
    }

    const isDuplicateQuestion = questionState.questions.some((question) => {
      const ques = question.question.trim().toLowerCase();
      const newQues = data.question.trim().toLowerCase();

      const quesId = question.id;
      const newQuesId = data.id;

      if (isEditing) {
        return ques === newQues && quesId !== newQuesId;
      }
      return ques === newQues;
    });

    if (isDuplicateQuestion && !isEditing) {
      setError("root", {
        type: "manual",
        message: "Question already exists",
      });
      scrollToTopSmooth();
      return;
    }

    const hasCorrespondingAnswer = data.options.some(
      (opt, index) => data.answers.find((answer) => answer === index) === index && opt
    );

    if (!hasCorrespondingAnswer) {
      setError("root", {
        type: "manual",
        message: "At least one of the chosen options must be the correct answer",
      });
      scrollToTopSmooth();

      return;
    }

    let updatedQuestions = [];

    if (isEditing) {
      updatedQuestions = questionState.questions.map((question) =>
        question.id === data.id ? data : question
      );
    } else {
      updatedQuestions = [...questionState.questions, data];
    }

    setQuestionState((prev) => ({ ...prev, questions: updatedQuestions, editingQuestion: null }));

    const { editingQuestion, ...state } = questionState;

    const quizData = { ...state, questions: updatedQuestions };

    watchQuizMutation.mutate(quizData);

    reset({
      id: generateID(updatedQuestions),
      question: "",
      options: ["", "", "", ""],
      answers: [0],
    });

    updateQuizPath(updatedQuestions);
  };

  const onError = () => {
    scrollToTopSmooth();
  };

  const error = extractEndValues(errors, "message")[0];

  return (
    <div className="flex flex-col gap-4">
      <QuizNameForm />
      <div className="flex flex-col justify-between w-full h-full p-8 bg-gray-800">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-2">
            <h3 className="text-2xl font-semibold text-gray-200">
              {isEditing ? "Update Question" : "Add new Question"}
            </h3>
            {error && <p className="text-lg text-red-500">{error}</p>}
          </div>
          <div className="flex flex-col items-start gap-y-6">
            {isEditing && (
              <DefaultBtn onClick={cancelEdit}>
                <IoMdClose size={24} />
                <span>Cancel edit</span>
              </DefaultBtn>
            )}
            {isDirty ||
              (isEditing && (
                <DeleteBtn onDelete={deleteQuestion}>
                  <span>Delete question</span>
                </DeleteBtn>
              ))}
          </div>
        </div>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col justify-between w-full h-full pb-8">
            <div className="mt-8">
              <Controller
                name="question"
                control={control}
                render={({ field }) => (
                  <FormInputBox
                    label="Question"
                    type="textarea"
                    value={field.value}
                    placeholder="Enter question here"
                    minLength={10}
                    maxLength={200}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-y-24">
              <div className="flex flex-col gap-y-8">
                <p className="my-4 text-gray-400">
                  <IoMdCheckmark size={24} className="inline" /> - Options marked with a checkmark
                  are the correct answers to the question
                </p>
                <div className="grid grid-cols-[1fr] lg:grid-cols-[repeat(2,1fr)] gap-4">
                  {Array.from({ length: 4 }, (_, index) => {
                    return (
                      <OptionCard
                        key={OPTION_COLORS[index]}
                        index={index}
                        bgColor={OPTION_COLORS[index]}
                      />
                    );
                  })}
                </div>
              </div>
              <OutlineBtn type="submit">
                <span className="text-xl font-semibold">
                  {isEditing ? "Update Question" : "Add Question"}
                </span>
              </OutlineBtn>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
