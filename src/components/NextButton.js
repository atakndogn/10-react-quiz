import Button from "./Button";

function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return <Button dispatch={dispatch} type="nextQuestion" btnText="Next" />;
  }

  // Last question
  if (index === numQuestions - 1) {
    return <Button dispatch={dispatch} type="finish" btnText="Finish" />;
  }
}

export default NextButton;
