import { useQuiz } from "../contexts/QuizContext";

function Button({ type, btnText }) {
  const { dispatch } = useQuiz();

  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: type })}>
      {btnText}
    </button>
  );
}

export default Button;
