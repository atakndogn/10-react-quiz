const { createContext, useContext, useReducer, useEffect } = require("react");

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // "laoding", "error", "ready","active","finished"
  status: "loading",

  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const currentQuestion = state.questions[state.index];

      const currentPoint =
        currentQuestion.correctOption === action.payload
          ? currentQuestion.points
          : 0;

      return {
        ...state,
        answer: action.payload,
        points: state.points + currentPoint,
      };

    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };

    case "finished":
      const curHighScore =
        state.points > state.highScore ? state.points : state.highScore;

      return { ...state, status: "finished", highScore: curHighScore };

    case "tick":
      const curStatus =
        state.secondsRemaining === 0 ? "finished" : state.status;

      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: curStatus,
      };

    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };

    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, q) => acc + q.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used out of the QuizProvider");

  return context;
}

export { QuizProvider, useQuiz };
