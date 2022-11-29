import { useMemo, useState } from "react";
import { Player } from "../../../App";
import GameColumn from "./GameColumn";
import "./index.scss";

interface GameBoardProps {
  players: Player[];
  currentPlayerNumber: number;
  setCurrentPlayerNumber: React.Dispatch<React.SetStateAction<number>>;
}

const GameBoard = (props: GameBoardProps) => {
  const { currentPlayerNumber, setCurrentPlayerNumber, players } = props;

  let initial = {} as any;
  for (var c = 0; c < 7; c++) {
    initial[c] = [null, null, null, null, null, null];
  }

  const [gameState, setGameState] = useState(initial);
  const [score, setScore] = useState(0);

  const [winner, setWinner] = useState<null | {
    nickname: string;
    age: number;
  }>(null);
  const [gameEnded, setGameEnded] = useState(false);

  const currentPlayer = useMemo(() => {
    if (!players) return null;
    else return players[currentPlayerNumber - 1]?.piece;
  }, [currentPlayerNumber]);

  const gameOver = (currentPlayer: null | string) => {
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
        setWinner(players[currentPlayerNumber - 1]);
      }

      setGameEnded(true);
    }

    setScore(score + 1);

    // Extra verbose due to inconsistent flashing
    if (currentPlayerNumber === 1) {
      setCurrentPlayerNumber(2);
    } else if (currentPlayerNumber === 2) {
      setCurrentPlayerNumber(1);
    }

    // setCurrentPlayer(currentPlayer == X_PIECE ? O_PIECE : X_PIECE);
  };

  console.log({ winner });

  //TODO: Integrate timer variable into save data
  let timerVariable = setInterval(countUpTimer, 1000);
  let totalSeconds = 0;

  function countUpTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds / 3600);
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour * 3600 + minute * 60);
    // document.getElementById("count_up_timer").innerHTML = hour + ":" + minute + ":" + seconds;
  }

  return (
    <div>
      {!gameEnded ? (
        <div>
          <div>
            <h4>Score: {score}</h4>
          </div>
          <div className="board">
            {Object.entries(gameState).map(([k, col], x) => {
              return (
                <GameColumn col={col} idx={x} onClick={() => addPiece(x)} />
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          Game Has Ended
          <div>{winner && <h2>{winner?.nickname} is the winner</h2>}</div>
          <div>
            <h3>Score: {score}</h3>

            <button>Start a new game</button>
            <button>Go to the score board</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
