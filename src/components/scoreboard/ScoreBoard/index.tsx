import { useEffect, useMemo, useState } from "react";
import "./index.scss";

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

    return scoreData.map((score: { nickname: string; score: number }) => {
      return (
        <div className="score-row">
          <h3>
            <span>User:</span> <span>{score.nickname}</span>
          </h3>
          <h3>
            <span>Score:</span> <span> {score.score}</span>
          </h3>
        </div>
      );
    });
  }, [scoreData]);

  return (
    <div>
      This is the scoreboard
      <div>{scoreList}</div>
    </div>
  );
};

export default ScoreBoard;
