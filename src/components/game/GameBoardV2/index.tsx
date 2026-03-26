import React, { useEffect, useRef, useState } from "react";
import { Player } from "../../../App";
import ScoreBoard from "../../scoreboard/ScoreBoard";
import {
  findWinningLine,
  getClassListArray,
  getColorOfCell,
  isBoardFull,
} from "./winDetection";
import "./index.scss";

interface GameBoardV2Props {
  players: Player[];
  currentPlayerNumber: number;
  setCurrentPlayerNumber: (evt: number) => void;
}

export interface User {
  nickname: string;
  age: number;
}

const ROWS = 6;
const COLS = 7;

function buildCellClasses(row: number, col: number): string {
  const parts = ["cell", `row-${row}`, `col-${col}`];
  if (col === 0) parts.push("left-border");
  if (col === COLS - 1) parts.push("right-border");
  if (row === 0) parts.push("top-border");
  if (row === ROWS - 1) parts.push("bottom-border");
  return parts.join(" ");
}

/**
 *
 * @property players: List of players entered on create form, pulled from localStorage
 * @property currentPlayerNumber: Number of player selected at parent, (controls turns/random player start)
 * @property setCurrentPlayerNumber: controls player turn, allows alternating based on playing
 * @returns GameBoardV2 component allowing 2 users to compete in connect four (functional component)
 */
const GameBoardV2 = (props: GameBoardV2Props) => {
  const { currentPlayerNumber, setCurrentPlayerNumber, players } = props;
  const [initialPlayerNumber, setInitialPlayerNumber] =
    useState(currentPlayerNumber);

  const [gameIsLive, setGameIsLive] = useState(true);
  const [yellowIsNext, setYellowIsNext] = useState<null | boolean>();
  const [score, setScore] = useState(1);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [isTie, setIsTie] = useState(false);

  const [winner, setWinner] = useState<null | {
    nickname: string;
    age: number;
  }>(null);

  const countRef = useRef<number | null>(null);
  const cellRefs = useRef<(HTMLButtonElement | null)[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );

  const snapshotBoardRows = (): Element[][] =>
    cellRefs.current.map((row) =>
      row.map((cell) => cell as Element)
    );

  useEffect(() => {
    // Sets initial value of pieces being used in connection with user choice.
    if (players[currentPlayerNumber - 1].color === "yellow") {
      setYellowIsNext(true);
    } else {
      setYellowIsNext(false);
    }
  }, [players, currentPlayerNumber]);

  useEffect(() => {
    handleTimer();
    return () => {
      if (countRef.current != null) {
        window.clearInterval(countRef.current);
      }
    };
  }, []);

  const getCellLocation = (cell: EventTarget) => {
    const classList = getClassListArray(cell as Element);

    const rowClass = classList.find((className) => className.includes("row"));
    const colClass = classList.find((className) => className.includes("col"));
    const rowIndex = rowClass[4];
    const colIndex = colClass[4];
    const rowNumber = parseInt(rowIndex, 10);
    const colNumber = parseInt(colIndex, 10);

    return [rowNumber, colNumber];
  };

  const getFirstOpenCellForColumn = (colIndex: number) => {
    for (let r = ROWS - 1; r >= 0; r--) {
      const cell = cellRefs.current[r][colIndex];
      if (!cell) continue;
      const classList = getClassListArray(cell);
      if (!classList.includes("yellow") && !classList.includes("red")) {
        return cell;
      }
    }

    return null;
  };

  const addToScoreboard = (user?: User) => {
    const time = document.getElementById("count_up_timer")?.innerText;

    const scoreBoard = localStorage.getItem("scoreboard");

    if (scoreBoard) {
      const parsed = JSON.parse(scoreBoard);
      if (parsed?.length) {
        parsed.push({
          nickname: user
            ? user.nickname
            : players[currentPlayerNumber - 1]?.nickname,
          score: score,
          duration: time,
        });
      }
      localStorage.setItem(`scoreboard`, JSON.stringify(parsed));
    } else {
      const data = [
        {
          nickname: user
            ? user.nickname
            : players[currentPlayerNumber - 1]?.nickname,
          score: score,
          duration: time,
        },
      ];
      localStorage.setItem(`scoreboard`, JSON.stringify(data));
    }
  };

  const checkWinningCells = (cells: Element[]) => {
    if (cells.length < 4) return false;

    setGameIsLive(false);

    handleTimer("stop");

    const playerWinner = localStorage.getItem(`player ${currentPlayerNumber}`);

    if (playerWinner) {
      setWinner(JSON.parse(playerWinner));
    } else {
      setWinner(players[currentPlayerNumber - 1]);
    }

    addToScoreboard();

    for (const cell of cells) {
      cell.classList.add("win");
    }

    if (initialPlayerNumber == 1) {
      setCurrentPlayerNumber(2);
      setInitialPlayerNumber(2);
    } else if (initialPlayerNumber == 2) {
      setCurrentPlayerNumber(1);
      setInitialPlayerNumber(1);
    }

    return true;
  };

  const checkStatusOfGame = (cell: Element) => {
    const color = getColorOfCell(cell);
    if (!color) return;
    const [rowIndex, colIndex] = getCellLocation(cell);
    const rows = snapshotBoardRows();

    const winningLine = findWinningLine(rows, rowIndex, colIndex, color);
    if (winningLine && checkWinningCells(winningLine)) return;

    if (isBoardFull(rows)) {
      setIsTie(true);
      handleTimer("stop");
      setGameIsLive(false);
    }
  };

  useEffect(() => {
    // Accounts for ties being last case in larger function above/after check
    if (isTie) {
      setWinner({ nickname: "Stalemate", age: 0 });
      addToScoreboard({ nickname: "Stalemate", age: 0 });
    }
  }, [isTie]);

  const handleCellClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!gameIsLive) return;
    const [, colIndex] = getCellLocation(e.currentTarget);

    const openCell = getFirstOpenCellForColumn(colIndex);

    if (!openCell) return;

    setScore((s) => s + 1);

    openCell.classList.add(yellowIsNext ? "yellow" : "red");
    checkStatusOfGame(openCell);

    if (currentPlayerNumber === 1) {
      setCurrentPlayerNumber(2);
    } else if (currentPlayerNumber === 2) {
      setCurrentPlayerNumber(1);
    }

    setYellowIsNext(!yellowIsNext);
  };

  const startNewGame = () => {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = cellRefs.current[r][c];
        if (!cell) continue;
        cell.classList.remove("red");
        cell.classList.remove("yellow");
        cell.classList.remove("win");
      }
    }

    setIsTie(false);
    handleTimer();
    setGameIsLive(true);
    setScore(1);

    if (showScoreboard) {
      setShowScoreboard(false);
    }
  };

  function handleTimer(command?: string) {
    const timerElement = document.getElementById("count_up_timer");

    if (command) {
      if (countRef.current != null) {
        window.clearInterval(countRef.current);
        countRef.current = null;
      }
      return;
    }

    if (!timerElement) return;

    if (countRef.current != null) {
      window.clearInterval(countRef.current);
      countRef.current = null;
    }

    timerElement.innerText = "0";
    const startTime = new Date();

    countRef.current = window.setInterval(() => {
      const el = document.getElementById("count_up_timer");
      if (el) {
        el.innerText = getTimerTime(startTime);
      }
    }, 1000);
  }

  const getTimerTime = (startTime: Date) => {
    const totalSeconds = Math.floor(
      (Date.now() - startTime.getTime()) / 1000
    );

    const hour = Math.floor(totalSeconds / 3600);
    const minute = Math.floor((totalSeconds - hour * 3600) / 60);
    const seconds = totalSeconds - (hour * 3600 + minute * 60);

    return minute + "(m)" + ":" + seconds + "(s)";
  };

  const clearUsers = () => {
    localStorage.clear();

    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  const boardCells = Array.from({ length: ROWS }, (_, row) =>
    Array.from({ length: COLS }, (_, col) => (
      <button
        key={`${row}-${col}`}
        type="button"
        ref={(el) => {
          cellRefs.current[row][col] = el;
        }}
        className={buildCellClasses(row, col)}
        onClick={handleCellClick}
        aria-label={`Drop piece in column ${col + 1}, row ${row + 1}`}
      />
    ))
  ).flat();

  return (
    <div>
      {!gameIsLive && showScoreboard && (
        <div>
          <button onClick={startNewGame} className="standardized-button">
            Start New Game
          </button>
          <ScoreBoard />
        </div>
      )}

      <div>
        {!gameIsLive && !showScoreboard && (
          <div className="announce-container">
            <h2>Game Has Ended</h2>
            <div>
              {!!winner && !isTie && <h2>{winner?.nickname} is the winner</h2>}
              {!!winner && isTie && <h2>{winner?.nickname}</h2>}

              <h3>Score: {score - 1}</h3>
            </div>
            <div className="button-container">
              <button onClick={startNewGame} className="standardized-button">
                Start a new game
              </button>

              <a href="/scoreboard">
                <button className="standardized-button">
                  Go to the score board
                </button>
              </a>

              <button
                onClick={() => clearUsers()}
                className="standardized-button"
              >
                Clear User
              </button>
            </div>
          </div>
        )}

        {gameIsLive && (
          <>
            <h4>
              <span>Score:</span> {score}
            </h4>
            {score === 1 && (
              <span>Click a column to place your first piece</span>
            )}
          </>
        )}

        <div className="game-board">{boardCells}</div>
      </div>
    </div>
  );
};

export default GameBoardV2;
