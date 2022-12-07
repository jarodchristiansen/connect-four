import { useEffect, useState } from "react";
import { Player } from "../../App";
import UsernameBanner from "../banners/UsernameBanner";
import CreateUserForm from "../forms/CreateUserForm";
import GameBoardV2 from "../game/GameBoardV2";

const AppPage = () => {
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
      setCurrentPlayerNumber(1);
    } else if (fetchedPlayers.length == 2) {
      let randomizedUser = Math.random() < 0.5 ? 1 : 2;
      setCurrentPlayerNumber(randomizedUser);
    }
  };

  return (
    <div>
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
};

export default AppPage;
