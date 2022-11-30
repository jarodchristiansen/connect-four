import React, { useEffect, useState } from "react";
import "./App.scss";
import CreateUserForm from "./components/forms/CreateUserForm";
import UsernameBanner from "./components/banners/UsernameBanner";
import GameBoard from "./components/game/GameBoard";
import GameBoardV2 from "./components/game/GameBoardV2";

export interface Player {
  nickname: string;
  age: number;
  piece: string;
  color: string;
}

/**
 *
 * @returns Connect-Four React app functional component
 */
function App() {
  const [currentPlayerNumber, setCurrentPlayerNumber] = useState(1);
  const [players, setPlayers] = useState<[] | Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    fetchPlayersFromStorage();
  }, [gameStarted]);

  const fetchPlayersFromStorage = () => {
    let player1 = localStorage.getItem(`player 1`);
    let player2 = localStorage.getItem("player 2");

    if (player1 && player2) {
      let parsedPlayer1 = JSON.parse(player1);
      let parsedPlayer2 = JSON.parse(player2);

      let fetchedPlayers = [parsedPlayer1, parsedPlayer2];

      setPlayers(fetchedPlayers);

      randomizeInitialPlayer(fetchedPlayers);
      setGameStarted(true);
    } else if (player1 && !player2) {
      setCurrentPlayerNumber(2);
    }
  };

  const randomizeInitialPlayer = (fetchedPlayers: Player[]) => {
    if (!fetchedPlayers?.length) {
      // Will set players to have no length/sign up form player 1
      setCurrentPlayerNumber(1);
    } else if (fetchedPlayers.length == 2) {
      // Very first game picks random user on refresh
      let randomizedUser = Math.random() < 0.5 ? 1 : 2;
      setCurrentPlayerNumber(randomizedUser);
    }
  };

  return (
    <div className="App">
      {!players?.length && (
        <CreateUserForm
          currentPlayerNumber={currentPlayerNumber}
          setCurrentPlayerNumber={(evt: number) => setCurrentPlayerNumber(evt)}
          startGame={() => setGameStarted(true)}
        />
      )}

      {!!players?.length && gameStarted && (
        <div className="main-game-container">
          <UsernameBanner
            players={players}
            currentPlayerNumber={currentPlayerNumber}
          />

          {/* Commented out due to being playable, but having 1 bug in column 7*/}
          {/* <GameBoard
            players={players}
            currentPlayerNumber={currentPlayerNumber}
            setCurrentPlayerNumber={(evt: number) => setCurrentPlayerNumber(evt)}
          /> */}

          <GameBoardV2
            players={players}
            currentPlayerNumber={currentPlayerNumber}
            setCurrentPlayerNumber={(evt: number) =>
              setCurrentPlayerNumber(evt)
            }
          />
        </div>
      )}
    </div>
  );
}

export default App;
