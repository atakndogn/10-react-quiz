import { useQuiz } from "../contexts/QuizContext";
import Button from "./Button";

function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz();

  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return <Button dispatch={dispatch} type="nextQuestion" btnText="Next" />;
  }

  // Last question
  if (index === numQuestions - 1) {
    return <Button dispatch={dispatch} type="finished" btnText="Finish" />;
  }
}

export default NextButton;
