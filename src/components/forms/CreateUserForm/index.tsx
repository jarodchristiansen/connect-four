import React, { useState } from "react";
import "./index.scss";

interface CreateUserFromProps {
  currentPlayerNumber: number;
  setCurrentPlayerNumber: React.Dispatch<React.SetStateAction<number>>;
}

const CreateUserForm = (props: CreateUserFromProps) => {
  const { currentPlayerNumber, setCurrentPlayerNumber } = props;

  const [nicknameValue, setNicknameValue] = useState("");
  const [age, setAge] = useState(0);

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
    };

    localStorage.setItem(`player ${currentPlayerNumber}`, JSON.stringify(data));

    if (isPlayerOne) {
      setCurrentPlayerNumber(2);
    } else {
      setCurrentPlayerNumber(1);
    }

    setNicknameValue("");
    setAge(0);
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

      <button onClick={submitUserData} className={"submit-button"}>
        Create User
      </button>
    </div>
  );
};

export default CreateUserForm;
