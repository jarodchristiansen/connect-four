import { useState } from "react";
import { Player } from "../../../App";
import "./index.scss";

interface GameBoardV2Props {
  players: Player[];
  currentPlayerNumber: number;
  setCurrentPlayerNumber: React.Dispatch<React.SetStateAction<number>>;
}

const GameBoardV2 = (props: GameBoardV2Props) => {
  const { currentPlayerNumber, setCurrentPlayerNumber, players } = props;

  const [initialPlayerNumber, setInitialPlayerNumber] =
    useState(currentPlayerNumber);
  const [gameIsLive, setGameIsLive] = useState(true);
  const [winner, setWinner] = useState<null | {
    nickname: string;
    age: number;
  }>(null);

  const [score, setScore] = useState(1);

  // DOM Elements
  const allCells = document.querySelectorAll(".cell:not(.row-top)");
  const topCells = document.querySelectorAll(".cell.row-top");
  const resetButton = document.querySelector(".reset");
  const statusSpan = document.querySelector(".status");

  // columns
  const column0 = [
    allCells[35],
    allCells[28],
    allCells[21],
    allCells[14],
    allCells[7],
    allCells[0],
    topCells[0],
  ];
  const column1 = [
    allCells[36],
    allCells[29],
    allCells[22],
    allCells[15],
    allCells[8],
    allCells[1],
    topCells[1],
  ];
  const column2 = [
    allCells[37],
    allCells[30],
    allCells[23],
    allCells[16],
    allCells[9],
    allCells[2],
    topCells[2],
  ];
  const column3 = [
    allCells[38],
    allCells[31],
    allCells[24],
    allCells[17],
    allCells[10],
    allCells[3],
    topCells[3],
  ];
  const column4 = [
    allCells[39],
    allCells[32],
    allCells[25],
    allCells[18],
    allCells[11],
    allCells[4],
    topCells[4],
  ];
  const column5 = [
    allCells[40],
    allCells[33],
    allCells[26],
    allCells[19],
    allCells[12],
    allCells[5],
    topCells[5],
  ];
  const column6 = [
    allCells[41],
    allCells[34],
    allCells[27],
    allCells[20],
    allCells[13],
    allCells[6],
    topCells[6],
  ];
  const columns = [
    column0,
    column1,
    column2,
    column3,
    column4,
    column5,
    column6,
  ];

  // rows
  const topRow = [
    topCells[0],
    topCells[1],
    topCells[2],
    topCells[3],
    topCells[4],
    topCells[5],
    topCells[6],
  ];
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
  const rows = [row0, row1, row2, row3, row4, row5, topRow];

  // variables
  let yellowIsNext = true;

  // Functions
  const getClassListArray = (cell: any) => {
    const classList = cell.classList;
    return [...classList];
  };

  const getCellLocation = (cell: any) => {
    const classList = getClassListArray(cell);

    const rowClass = classList.find((className) => className.includes("row"));
    const colClass = classList.find((className) => className.includes("col"));
    const rowIndex = rowClass[4];
    const colIndex = colClass[4];
    const rowNumber = parseInt(rowIndex, 10);
    const colNumber = parseInt(colIndex, 10);

    return [rowNumber, colNumber];
  };

  const getFirstOpenCellForColumn = (colIndex: any) => {
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

  const clearColorFromTop = (colIndex: any) => {
    const topCell = topCells[colIndex];
    topCell.classList.remove("yellow");
    topCell.classList.remove("red");
  };

  const getColorOfCell = (cell: any) => {
    const classList = getClassListArray(cell);
    if (classList.includes("yellow")) return "yellow";
    if (classList.includes("red")) return "red";
    return null;
  };

  const checkWinningCells = (cells: any) => {
    if (cells.length < 4) return false;

    setGameIsLive(false);
    for (const cell of cells) {
      cell.classList.add("win");
    }

    if (statusSpan) {
      statusSpan.textContent = `${yellowIsNext ? "Yellow" : "Red"} has won!`;
    }

    return true;
  };

  const declareWinner = () => {
    let playerWinner = localStorage.getItem(`player ${currentPlayerNumber}`);

    if (playerWinner) {
      setWinner(JSON.parse(playerWinner));
    } else {
      setWinner(players[currentPlayerNumber - 1]);
    }

    setGameIsLive(false);

    let time = document.getElementById("count_up_timer")?.innerText;

    let scoreBoard = localStorage.getItem("scoreboard");

    if (scoreBoard) {
      let parsed = JSON.parse(scoreBoard);
      if (parsed?.length) {
        parsed.push({
          nickname: players[currentPlayerNumber - 1]?.nickname,
          score: score,
          duration: time,
        });
      }
      localStorage.setItem(`scoreboard`, JSON.stringify(parsed));
    } else {
      const data = [
        {
          nickname: players[currentPlayerNumber - 1]?.nickname,
          score: score,
          duration: time,
        },
      ];
      localStorage.setItem(`scoreboard`, JSON.stringify(data));
    }
  };

  const checkStatusOfGame = (cell: any) => {
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

    setGameIsLive(false);
    if (statusSpan) {
      statusSpan.textContent = "Game is a tie!";
    }
  };

  // Event Handlers
  const handleCellMouseOver = (e: any) => {
    if (!gameIsLive) return;
    const cell = e.target;
    const [rowIndex, colIndex] = getCellLocation(cell);

    const topCell = topCells[colIndex];
    topCell.classList.add(yellowIsNext ? "yellow" : "red");
  };

  const handleCellMouseOut = (e: any) => {
    const cell = e.target;
    const [rowIndex, colIndex] = getCellLocation(cell);
    clearColorFromTop(colIndex);
  };

  //   const addPiece = (columnIdx: any) => {
  //     const column = gameState[columnIdx];
  //     const piecePos = column.indexOf(null);
  //     column[piecePos] = currentPlayer;

  //     setGameState({
  //       ...gameState,
  //       [columnIdx]: column,
  //     });

  //     // game over?
  //     if (gameOver(currentPlayer)) {
  //       let playerWinner = localStorage.getItem(`player ${currentPlayerNumber}`);

  //       if (playerWinner) {
  //         setWinner(JSON.parse(playerWinner));
  //       } else {
  //         setWinner(players[currentPlayerNumber - 1]);
  //       }

  //       setGameEnded(true);

  //       let time = document.getElementById("count_up_timer")?.innerText;

  //       let scoreBoard = localStorage.getItem("scoreboard");

  //       if (scoreBoard) {
  //         let parsed = JSON.parse(scoreBoard);
  //         if (parsed?.length) {
  //           parsed.push({
  //             nickname: players[currentPlayerNumber - 1]?.nickname,
  //             score: score,
  //             duration: time,
  //           });
  //         }
  //         localStorage.setItem(`scoreboard`, JSON.stringify(parsed));
  //       } else {
  //         const data = [
  //           {
  //             nickname: players[currentPlayerNumber - 1]?.nickname,
  //             score: score,
  //             duration: time,
  //           },
  //         ];
  //         localStorage.setItem(`scoreboard`, JSON.stringify(data));
  //       }
  //     } else if (!gameOver(currentPlayer)) {
  //       setScore(score + 1);

  //       // Extra verbose due to inconsistent flashing
  //       if (currentPlayerNumber === 1) {
  //         setCurrentPlayerNumber(2);
  //       } else if (currentPlayerNumber === 2) {
  //         setCurrentPlayerNumber(1);
  //       }
  //     }
  //   };

  const handleCellClick = (e: any) => {
    if (!gameIsLive) return;
    const cell = e.target;
    const [rowIndex, colIndex] = getCellLocation(cell);

    const openCell = getFirstOpenCellForColumn(colIndex);

    if (!openCell) return;

    openCell.classList.add(yellowIsNext ? "yellow" : "red");
    checkStatusOfGame(openCell);
    setScore(score + 1);

    yellowIsNext = !yellowIsNext;
    clearColorFromTop(colIndex);
    // if (gameIsLive) {
    //   const topCell = topCells[colIndex];
    //   topCell.classList.add(yellowIsNext ? "yellow" : "red");
    // }
  };

  //   // Adding Event Listeners
  //   for (const row of rows) {
  //     for (const cell of row) {
  //       cell.addEventListener("mouseover", handleCellMouseOver);
  //       cell.addEventListener("mouseout", handleCellMouseOut);
  //       cell.addEventListener("click", handleCellClick);
  //     }
  //   }

  //   if (resetButton) {
  //     resetButton.addEventListener("click", () => {
  //       for (const row of rows) {
  //         for (const cell of row) {
  //           cell.classList.remove("red");
  //           cell.classList.remove("yellow");
  //           cell.classList.remove("win");
  //         }
  //       }
  //       gameIsLive = true;
  //       yellowIsNext = true;

  //       if (statusSpan) {
  //         statusSpan.textContent = "";
  //       }
  //     });
  //   }

  return (
    <div className="game-board">
      <div className="cell row-top col-0" onClick={handleCellClick}></div>
      <div className="cell row-top col-1" onClick={handleCellClick}></div>
      <div className="cell row-top col-2" onClick={handleCellClick}></div>
      <div className="cell row-top col-3" onClick={handleCellClick}></div>
      <div className="cell row-top col-4" onClick={handleCellClick}></div>
      <div className="cell row-top col-5" onClick={handleCellClick}></div>
      <div className="cell row-top col-6" onClick={handleCellClick}></div>
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
  );
};

export default GameBoardV2;
