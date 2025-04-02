import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useFormContext } from "react-hook-form";
import QuizCard from "./QuizCard";

export default function QuizList() {
  const { watch, setValue } = useFormContext();

  const questions = watch("questions");

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedQuestions = [...questions];
    const [movedItem] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, movedItem);

    setValue("questions", reorderedQuestions);
  };

  return (
    <div className="max-w-[300px] p-4 h-full bg-gray-800">
      <p className="p-4 text-lg font-semibold mb-8 bg-gradient-to-b from-blue-800 to-indigo-600">
        Your question. Click on one to edit or drag them around to change order
      </p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="quizList">
          {(provided) => (
            <ul
              className="flex flex-col gap-y-4"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {questions.map((question, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <QuizCard question={question} index={index + 1} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
