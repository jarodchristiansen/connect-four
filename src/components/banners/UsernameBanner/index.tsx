import { Player } from "../../../App";
import "./index.scss";

interface UsernameBannerProps {
  players: Player[];
  currentPlayerNumber: number;
}

const UsernameBanner = (props: UsernameBannerProps) => {
  const { players, currentPlayerNumber } = props;

  return (
    <div>
      {currentPlayerNumber}

      <div className="row-container">
        <div
          className={`user-name-column ${
            currentPlayerNumber === 1 && "current-turn"
          }`}
        >
          <h2>User: {players[0]?.nickname}</h2>
          <h4>Age: {players[0]?.age}</h4>
        </div>

        <div
          className={`user-name-column ${
            currentPlayerNumber === 2 && "current-turn"
          }`}
        >
          <h2>User: {players[1]?.nickname}</h2>
          <h4>Age: {players[1]?.age}</h4>
        </div>
      </div>
    </div>
  );
};

export default UsernameBanner;
