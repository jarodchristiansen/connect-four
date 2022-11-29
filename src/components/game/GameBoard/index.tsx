import { useState } from "react";
import GameColumn from "./GameColumn";
import "./index.scss";

interface GameBoardProps {
  currentPlayerNumber: number;
  setCurrentPlayerNumber: React.Dispatch<React.SetStateAction<number>>;
}

const GameBoard = (props: GameBoardProps) => {
  const { currentPlayerNumber, setCurrentPlayerNumber } = props;

  const X_PIECE = "🟡";
  const O_PIECE = "🔴";

  let initial = {} as any;
  for (var c = 0; c < 7; c++) {
    initial[c] = [null, null, null, null, null, null];
  }

  const [gameState, setGameState] = useState(initial);
  const [score, setScore] = useState(0);

  const [winner, setWinner] = useState<null | string>(null);
  const [gameEnded, setGameEnded] = useState(false);

  const [currentPlayer, setCurrentPlayer] = useState(
    currentPlayerNumber == 1 ? X_PIECE : O_PIECE
  );

  const gameOver = (currentPlayer: any) => {
    let column;

    // Check if there are any four in a row in a column
    for (var c = 0; c < 7; c++) {
      for (var r = 0; r < 6 - 3; r++) {
        if (
          gameState[c][r] != null &&
          gameState[c][r] == gameState[c][r + 1] &&
          gameState[c][r + 1] == gameState[c][r + 2] &&
          gameState[c][r + 2] == gameState[c][r + 3]
        ) {
          return true;
        }
      }
    }

    // Check if there are any four in a row in a row
    for (var c = 0; c < 7 - 3; c++) {
      for (var r = 0; r < 6; r++) {
        if (
          gameState[c][r] != null &&
          gameState[c][r] == gameState[c + 1][r] &&
          gameState[c + 1][r] == gameState[c + 2][r] &&
          gameState[c + 2][r] == gameState[c + 3][r]
        ) {
          return true;
        }
      }
    }

    // Check if there are any four diagonal up to the right
    for (var c = 0; c < 7; c++) {
      for (var r = 0; r < 6; r++) {
        if (
          gameState[c][r] != null &&
          gameState[c][r] == gameState[c + 1][r + 1] &&
          gameState[c + 1][r + 1] == gameState[c + 2][r + 2] &&
          gameState[c + 2][r + 2] == gameState[c + 3][r + 3]
        ) {
          return true;
        }
      }
    }

    // Check if there are any four diagonal down to the right
    for (var c = 0; c < 7; c++) {
      for (var r = 5; r >= 3; r--) {
        if (
          gameState[c][r] != null &&
          gameState[c][r] == gameState[c + 1][r - 1] &&
          gameState[c + 1][r - 1] == gameState[c + 2][r - 2] &&
          gameState[c + 2][r - 2] == gameState[c + 3][r - 3]
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const addPiece = (columnIdx: any) => {
    console.log(columnIdx, gameState[columnIdx]);
    const column = gameState[columnIdx];
    const piecePos = column.indexOf(null);
    column[piecePos] = currentPlayer;

    console.log({ columnIdx, column, piecePos });

    setGameState({
      ...gameState,
      [columnIdx]: column,
    });

    // game over?
    if (gameOver(currentPlayer)) {
      let playerWinner = localStorage.getItem(`player ${currentPlayerNumber}`);

      if (playerWinner) {
        setWinner(JSON.parse(playerWinner));
      } else {
        setWinner(currentPlayer);
      }

      setGameEnded(true);

      console.log("after gameOver", { playerWinner });
    }

    setScore(score + 1);
    setCurrentPlayer(currentPlayer == X_PIECE ? O_PIECE : X_PIECE);
  };

  return (
    <div>
      Thi is the gameBoard {currentPlayer} - {currentPlayerNumber}
      {!gameEnded ? (
        <div>
          <div>Score: {score}</div>
          <div className="board">
            <div>{winner && <h1>{winner} is the winner</h1>}</div>
            {/* Current player is {currentPlayer}. */}
            {Object.entries(gameState).map(([k, col], x) => {
              return (
                <GameColumn col={col} idx={x} onClick={() => addPiece(x)} />
              );
            })}
          </div>
        </div>
      ) : (
        <div>Game Has Ended</div>
      )}
    </div>
  );
};

export default GameBoard;
