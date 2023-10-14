import { useEffect } from "react";

const showTime = (t) => (t < 10 ? `0${t}` : t);

function Timer({ secondsRemaining, dispatch }) {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000); // Every 1 second

    return () => clearInterval(interval); // Cleanup function
  }, [secondsRemaining, dispatch]);

  return <div className="timer">{`${showTime(mins)}:${showTime(secs)}`}</div>;
}

export default Timer;
