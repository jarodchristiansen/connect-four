import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import CreateUserForm from "./components/forms/CreateUserForm";
import UsernameBanner from "./components/banners/UsernameBanner";

export interface Player {
  nickname: string;
  age: number;
}

function App() {
  const [currentPlayerNumber, setCurrentPlayerNumber] = useState(1);
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    fetchPlayersFromStorage();
  }, [currentPlayerNumber]);

  const fetchPlayersFromStorage = () => {
    let player1 = localStorage.getItem(`player 1`);
    let player2 = localStorage.getItem("player 2");

    if (player1 && player2) {
      let parsedPlayer1 = JSON.parse(player1);
      let parsedPlayer2 = JSON.parse(player2);

      let fetchedPlayers = [parsedPlayer1, parsedPlayer2];

      setPlayers(fetchedPlayers);
    } else if (player1 && !player2) {
      console.log("ONLY PLAYER 1 COnditional", JSON.parse(player1));
      setCurrentPlayerNumber(2);
    }
  };

  useEffect(() => {
    if (!players?.length) {
      setCurrentPlayerNumber(1);
    } else if (players.length === 2) {
      // If game starting picks first user turn at random
      let randomizedUser = Math.random() < 0.5 ? 1 : 2;
      setCurrentPlayerNumber(randomizedUser);

      console.log("THIS IS THE GAME START", { randomizedUser });
    }
  }, [players]);

  return (
    <div className="App">
      {!players?.length && (
        <CreateUserForm
          currentPlayerNumber={currentPlayerNumber}
          setCurrentPlayerNumber={(evt: any) => setCurrentPlayerNumber(evt)}
        />
      )}

      {!!players?.length && (
        <div>
          <UsernameBanner
            players={players}
            currentPlayerNumber={currentPlayerNumber}
          />
          This Would Be The Game Time Screen
        </div>
      )}
    </div>
  );
}

export default App;
