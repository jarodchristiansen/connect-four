import React, { useEffect, useMemo, useState } from "react";
import { Player } from "../../../../App";
import ScoreBoard from "../../../scoreboard/ScoreBoard";
import "./index.scss";

interface GameBoardV2Props {
  players: Player[];
  currentPlayerNumber: number;
  setCurrentPlayerNumber: (evt: number) => void;
}

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

  const countRef = React.useRef(null as any);

  useEffect(() => {
    // Sets initial value of pieces being used in connection with user choice.
    if (players[currentPlayerNumber - 1].color === "yellow") {
      setYellowIsNext(true);
    } else {
      setYellowIsNext(false);
    }
  }, [players]);

  useEffect(() => {
    handleTimer();
  }, []);

  const allCells = document.querySelectorAll(".cell:not(.row-top)");

  const columns = useMemo(() => {
    const column0 = [
      allCells[35],
      allCells[28],
      allCells[21],
      allCells[14],
      allCells[7],
      allCells[0],
    ];
    const column1 = [
      allCells[36],
      allCells[29],
      allCells[22],
      allCells[15],
      allCells[8],
      allCells[1],
    ];
    const column2 = [
      allCells[37],
      allCells[30],
      allCells[23],
      allCells[16],
      allCells[9],
      allCells[2],
    ];
    const column3 = [
      allCells[38],
      allCells[31],
      allCells[24],
      allCells[17],
      allCells[10],
      allCells[3],
    ];
    const column4 = [
      allCells[39],
      allCells[32],
      allCells[25],
      allCells[18],
      allCells[11],
      allCells[4],
    ];
    const column5 = [
      allCells[40],
      allCells[33],
      allCells[26],
      allCells[19],
      allCells[12],
      allCells[5],
    ];
    const column6 = [
      allCells[41],
      allCells[34],
      allCells[27],
      allCells[20],
      allCells[13],
      allCells[6],
    ];

    return [column0, column1, column2, column3, column4, column5, column6];
  }, [gameIsLive, showScoreboard, allCells]);

  const rows = useMemo(() => {
    const row0 = [
      allCells[0],
      allCells[1],
      allCells[2],
      allCells[3],
      allCells[4],
      allCells[5],
      allCells[6],
    ];
    const row1 = [
      allCells[7],
      allCells[8],
      allCells[9],
      allCells[10],
      allCells[11],
      allCells[12],
      allCells[13],
    ];
    const row2 = [
      allCells[14],
      allCells[15],
      allCells[16],
      allCells[17],
      allCells[18],
      allCells[19],
      allCells[20],
    ];
    const row3 = [
      allCells[21],
      allCells[22],
      allCells[23],
      allCells[24],
      allCells[25],
      allCells[26],
      allCells[27],
    ];
    const row4 = [
      allCells[28],
      allCells[29],
      allCells[30],
      allCells[31],
      allCells[32],
      allCells[33],
      allCells[34],
    ];
    const row5 = [
      allCells[35],
      allCells[36],
      allCells[37],
      allCells[38],
      allCells[39],
      allCells[40],
      allCells[41],
    ];

    return [row0, row1, row2, row3, row4, row5];
  }, [gameIsLive, showScoreboard, allCells]);

  // Functions
  const getClassListArray = (cell: any) => {
    const classList = cell.classList;
    return [...classList];
  };

  const getCellLocation = (cell: EventTarget) => {
    const classList = getClassListArray(cell);

    const rowClass = classList.find((className) => className.includes("row"));
    const colClass = classList.find((className) => className.includes("col"));
    const rowIndex = rowClass[4];
    const colIndex = colClass[4];
    const rowNumber = parseInt(rowIndex, 10);
    const colNumber = parseInt(colIndex, 10);

    return [rowNumber, colNumber];
  };

  const getFirstOpenCellForColumn = (colIndex: number) => {
    const column = columns[colIndex];
    const columnWithoutTop = column.slice(0, 6);

    for (const cell of columnWithoutTop) {
      const classList = getClassListArray(cell);
      if (!classList.includes("yellow") && !classList.includes("red")) {
        return cell;
      }
    }

    return null;
  };

  const getColorOfCell = (cell: Element) => {
    const classList = getClassListArray(cell);
    if (classList.includes("yellow")) return "yellow";
    if (classList.includes("red")) return "red";
    return null;
  };

  const addToScoreboard = (user?: { nickname: string; age: number }) => {
    let time = document.getElementById("count_up_timer")?.innerText;

    let scoreBoard = localStorage.getItem("scoreboard");

    if (scoreBoard) {
      let parsed = JSON.parse(scoreBoard);
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

    let playerWinner = localStorage.getItem(`player ${currentPlayerNumber}`);

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

    // Check horizontally
    let winningCells = [cell];
    let rowToCheck = rowIndex;
    let colToCheck = colIndex - 1;

    while (colToCheck >= 0) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        colToCheck--;
      } else {
        break;
      }
    }
    colToCheck = colIndex + 1;
    while (colToCheck <= 6) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        colToCheck++;
      } else {
        break;
      }
    }
    let isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;

    // Check vertically
    winningCells = [cell];
    rowToCheck = rowIndex - 1;
    colToCheck = colIndex;
    while (rowToCheck >= 0) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck--;
      } else {
        break;
      }
    }
    rowToCheck = rowIndex + 1;
    while (rowToCheck <= 5) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck++;
      } else {
        break;
      }
    }
    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;

    // Check diagonally /
    winningCells = [cell];
    rowToCheck = rowIndex + 1;
    colToCheck = colIndex - 1;
    while (colToCheck >= 0 && rowToCheck <= 5) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck++;
        colToCheck--;
      } else {
        break;
      }
    }
    rowToCheck = rowIndex - 1;
    colToCheck = colIndex + 1;
    while (colToCheck <= 6 && rowToCheck >= 0) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck--;
        colToCheck++;
      } else {
        break;
      }
    }
    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;

    // Check diagonally \
    winningCells = [cell];
    rowToCheck = rowIndex - 1;
    colToCheck = colIndex - 1;
    while (colToCheck >= 0 && rowToCheck >= 0) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck--;
        colToCheck--;
      } else {
        break;
      }
    }
    rowToCheck = rowIndex + 1;
    colToCheck = colIndex + 1;
    while (colToCheck <= 6 && rowToCheck <= 5) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck++;
        colToCheck++;
      } else {
        break;
      }
    }

    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;

    // Check to see if we have a tie
    const rowsWithoutTop = rows.slice(0, 6);
    for (const row of rowsWithoutTop) {
      for (const cell of row) {
        const classList = getClassListArray(cell);
        if (!classList.includes("yellow") && !classList.includes("red")) {
          return;
        }
      }
    }

    setIsTie(true);
    handleTimer("stop");
    setGameIsLive(false);

    // if (statusSpan) {
    //   statusSpan.textContent = "Game is a tie!";
    // }
  };

  useEffect(() => {
    // Accounts for ties being last case in larger function above/after check
    if (isTie) {
      setWinner({ nickname: "Stalemate", age: 0 });
      addToScoreboard({ nickname: "Stalemate", age: 0 });
    }
  }, [isTie]);

  const handleCellClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!gameIsLive) return;
    const cell = e.target;
    const [rowIndex, colIndex] = getCellLocation(cell);

    const openCell = getFirstOpenCellForColumn(colIndex);

    if (!openCell) return;

    setScore(score + 1);

    openCell.classList.add(yellowIsNext ? "yellow" : "red");
    checkStatusOfGame(openCell);

    // Extra verbose due to inconsistent flashing
    if (currentPlayerNumber === 1) {
      setCurrentPlayerNumber(2);
    } else if (currentPlayerNumber === 2) {
      setCurrentPlayerNumber(1);
    }

    setYellowIsNext(!yellowIsNext);
  };

  const startNewGame = () => {
    // // Alternates starting player
    // if (initialPlayerNumber == 1) {
    //   setInitialPlayerNumber(2);
    //   setCurrentPlayerNumber(2);
    // } else if (initialPlayerNumber == 2) {
    //   setInitialPlayerNumber(1);
    //   setCurrentPlayerNumber(1);
    // }

    // Clears cells to start new game
    for (const row of rows) {
      for (const cell of row) {
        cell.classList.remove("red");
        cell.classList.remove("yellow");
        cell.classList.remove("win");
      }
    }

    setIsTie(false);
    handleTimer();
    setGameIsLive(true);
    setScore(1);

    !!showScoreboard && setShowScoreboard(false);
  };

  const renderScoreboard = () => {
    setShowScoreboard(true);
  };

  function handleTimer(command?: string) {
    let timerElement = document.getElementById("count_up_timer");

    if (timerElement) {
      if (!command) {
        timerElement.innerText = "0";
        let startTime = new Date();

        countRef.current = setInterval(() => {
          if (timerElement) {
            timerElement.innerText = getTimerTime(startTime);
          }
        }, 1000);
      }

      if (command) {
        clearInterval(countRef.current);
      }
    }
  }

  function getTimerTime(startTime: any) {
    let totalSeconds = Math.floor(((new Date() as any) - startTime) / 1000);

    let hour = Math.floor(totalSeconds / 3600);
    let minute = Math.floor((totalSeconds - hour * 3600) / 60);
    let seconds = totalSeconds - (hour * 3600 + minute * 60);

    let timeString = minute + ":" + seconds;

    return timeString;
  }

  return (
    <div>
      {!gameIsLive && showScoreboard && (
        <div>
          <button onClick={startNewGame}>Start New Game</button>
          <ScoreBoard />
        </div>
      )}

      <div>
        {!gameIsLive && !showScoreboard && (
          <div>
            Game Has Ended
            <div>
              {!!winner && !isTie && <h2>{winner?.nickname} is the winner</h2>}
              {!!winner && isTie && <h2>{winner?.nickname}</h2>}
            </div>
            <div>
              <h3>Score: {score - 1}</h3>

              <button onClick={startNewGame}>Start a new game</button>
              <button onClick={renderScoreboard}>Go to the score board</button>
            </div>
          </div>
        )}

        {gameIsLive && (
          <h4>
            <span>Score:</span> {score}
          </h4>
        )}

        <div className="game-board">
          <div
            className="cell row-0 col-0 left-border top-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-0 col-1 top-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-0 col-2 top-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-0 col-3 top-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-0 col-4 top-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-0 col-5 top-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-0 col-6 top-border right-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-1 col-0 left-border"
            onClick={handleCellClick}
          ></div>
          <div className="cell row-1 col-1" onClick={handleCellClick}></div>
          <div className="cell row-1 col-2" onClick={handleCellClick}></div>
          <div className="cell row-1 col-3" onClick={handleCellClick}></div>
          <div className="cell row-1 col-4" onClick={handleCellClick}></div>
          <div className="cell row-1 col-5" onClick={handleCellClick}></div>
          <div
            className="cell row-1 col-6 right-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-2 col-0 left-border"
            onClick={handleCellClick}
          ></div>
          <div className="cell row-2 col-1" onClick={handleCellClick}></div>
          <div className="cell row-2 col-2" onClick={handleCellClick}></div>
          <div className="cell row-2 col-3" onClick={handleCellClick}></div>
          <div className="cell row-2 col-4" onClick={handleCellClick}></div>
          <div className="cell row-2 col-5" onClick={handleCellClick}></div>
          <div
            className="cell row-2 col-6 right-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-3 col-0 left-border"
            onClick={handleCellClick}
          ></div>
          <div className="cell row-3 col-1" onClick={handleCellClick}></div>
          <div className="cell row-3 col-2" onClick={handleCellClick}></div>
          <div className="cell row-3 col-3" onClick={handleCellClick}></div>
          <div className="cell row-3 col-4" onClick={handleCellClick}></div>
          <div className="cell row-3 col-5" onClick={handleCellClick}></div>
          <div
            className="cell row-3 col-6 right-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-4 col-0 left-border"
            onClick={handleCellClick}
          ></div>
          <div className="cell row-4 col-1" onClick={handleCellClick}></div>
          <div className="cell row-4 col-2" onClick={handleCellClick}></div>
          <div className="cell row-4 col-3" onClick={handleCellClick}></div>
          <div className="cell row-4 col-4" onClick={handleCellClick}></div>
          <div className="cell row-4 col-5" onClick={handleCellClick}></div>
          <div
            className="cell row-4 col-6 right-border"
            onClick={handleCellClick}
          ></div>

          <div
            className="cell row-5 col-0 bottom-border left-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-5 col-1 bottom-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-5 col-2 bottom-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-5 col-3 bottom-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-5 col-4 bottom-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-5 col-5 bottom-border"
            onClick={handleCellClick}
          ></div>
          <div
            className="cell row-5 col-6 bottom-border right-border"
            onClick={handleCellClick}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GameBoardV2;
