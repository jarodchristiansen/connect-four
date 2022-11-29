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
      <div className="username-banner-header">
        <u>
          <h2 className="current-turn-header">Current Turn</h2>
        </u>

        <h2>
          {players[currentPlayerNumber - 1]?.nickname} -{" "}
          {players[currentPlayerNumber - 1]?.piece}
        </h2>

        <div className="row-container">
          <div
            className={`user-name-column ${
              currentPlayerNumber === 1 && "current-turn"
            }`}
          >
            <h2>{players[0]?.nickname}</h2>
            <h4>Age: {players[0]?.age}</h4>
            <h4>Piece: {players[0]?.piece}</h4>
          </div>

          <div
            className={`user-name-column ${
              currentPlayerNumber === 2 && "current-turn"
            }`}
          >
            <h2>{players[1]?.nickname}</h2>
            <h4>Age: {players[1]?.age}</h4>
            <h4>Piece: {players[1]?.piece}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsernameBanner;
