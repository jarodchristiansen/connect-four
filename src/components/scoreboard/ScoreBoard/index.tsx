import { useEffect, useMemo, useState } from "react";
import "./index.scss";

/**
 *
 * @returns Scoreboard component that maintains record of completed games in localstorage to be viewed
 */
const ScoreBoard = () => {
  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    fetchLocalScores();
  }, []);

  const fetchLocalScores = () => {
    let scoreBoard = localStorage.getItem("scoreboard");

    if (scoreBoard) {
      let parsedData = JSON.parse(scoreBoard);
      setScoreData(parsedData);
    }
  };

  const scoreList = useMemo(() => {
    if (!scoreData) return [];

    return scoreData.map(
      (
        score: { nickname: string; score: number; duration?: string },
        idx: number
      ) => {
        return (
          <div className="score-row">
            <h3>Game: {idx + 1}</h3>
            <h3>
              <span>Winner:</span> <span>{score.nickname}</span>
            </h3>
            <h3>
              <span>Moves:</span> <span> {score.score}</span>
            </h3>

            {!!score?.duration && (
              <h3>
                <span>Duration:</span> <span> {score?.duration}</span>
              </h3>
            )}
          </div>
        );
      }
    );
  }, [scoreData]);

  return (
    <div className="score-container">
      <h2>Previous Games</h2>
      <div>{scoreList}</div>
    </div>
  );
};

export default ScoreBoard;
