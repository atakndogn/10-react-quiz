function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
  const percentPoint = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentPoint === 100) emoji = "🥇";
  if (percentPoint >= 80 && percentPoint < 100) emoji = "🎉";
  if (percentPoint >= 50 && percentPoint < 80) emoji = "🤔";
  if (percentPoint >= 0 && percentPoint < 50) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of
        {maxPossiblePoints} ({Math.ceil(percentPoint)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
    </>
  );
}

export default FinishScreen;
