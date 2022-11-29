import React, { useState } from "react";
import "./index.scss";

interface CreateUserFromProps {
  currentPlayerNumber: number;
  setCurrentPlayerNumber: (evt: number) => void;
  startGame: () => void;
}

const CreateUserForm = (props: CreateUserFromProps) => {
  const { currentPlayerNumber, setCurrentPlayerNumber, startGame } = props;

  const [nicknameValue, setNicknameValue] = useState("");
  const [age, setAge] = useState(0);
  const [piece, setPiece] = useState("");
  const [color, setColor] = useState("");

  const isPlayerOne = currentPlayerNumber === 1;

  const changeNickName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(evt.target.value);
  };

  const changeAge = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(evt.target.value));
  };

  const submitUserData = () => {
    const data = {
      nickname: nicknameValue,
      age,
      piece,
      color,
    };

    localStorage.setItem(`player ${currentPlayerNumber}`, JSON.stringify(data));

    if (isPlayerOne) {
      piece === "🟡" ? setPiece("🔴") : setPiece("🟡");
      color === "red" ? setColor("yellow") : setColor("red");

      setCurrentPlayerNumber(2);
      // Sets second user piece automatically based on what previous user selection
    } else {
      startGame();
    }

    setNicknameValue("");
    setAge(0);
  };

  const changePieceSelection = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt?.target?.value) {
      if (evt.target.value === "🟡") {
        setPiece("🟡");
        setColor("yellow");
      } else if (evt.target.value === "🔴") {
        setColor("red");
        setPiece("🔴");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Create User - Player {isPlayerOne ? "One" : "Two"}</h2>

      <div className="input-container">
        <label htmlFor="nicknameInput" className="form-label">
          Player {isPlayerOne ? "One" : "Two"} - Nickname
        </label>

        <input
          name={"Nickname"}
          type="text"
          id="nicknameInput"
          aria-describedby="Nickname Field"
          className="create-player-input"
          value={nicknameValue}
          onChange={changeNickName}
        />
      </div>

      <div className="input-container">
        <label htmlFor="ageInput" className="form-label">
          Player {isPlayerOne ? "One" : "Two"} - Age
        </label>

        <input
          name={"Age"}
          type="number"
          id="ageInput"
          aria-describedby="Age Field"
          className="create-player-input"
          value={age}
          onChange={changeAge}
        />
      </div>

      {isPlayerOne && (
        <div>
          <fieldset>
            <h3>Choose your player color</h3>
            <div>
              <input
                type="radio"
                id="red"
                name="piece"
                value="🔴"
                onChange={changePieceSelection}
              />
              <label htmlFor="red">🔴</label>
            </div>

            <div>
              <input
                type="radio"
                id="yellow"
                name="piece"
                value="🟡"
                onChange={changePieceSelection}
              />
              <label htmlFor="yellow">🟡</label>
            </div>
          </fieldset>
        </div>
      )}

      <button onClick={submitUserData} className={"submit-button"}>
        Create User
      </button>
    </div>
  );
};

export default CreateUserForm;
