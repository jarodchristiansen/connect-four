import { Player } from "../../../App";
import "./index.scss";

interface UsernameBannerProps {
  players: Player[];
  currentPlayerNumber: number;
}

/**
 *
 * @property players: List of players entered on create form, pulled from localStorage
 * @property currentPlayerNumber: Number of player selected at parent, (changes highlighted box/current turn)
 * @returns GameBoardV2 component allowing 2 users to compete in connect four (functional component)
 */
const UsernameBanner = (props: UsernameBannerProps) => {
  const { players, currentPlayerNumber } = props;

  return (
    <div className="banner-container">
      <div className="username-banner-header">
        <div className="row-container">
          <div
            className={`user-name-column ${
              currentPlayerNumber === 1 && "current-turn"
            }`}
          >
            <h2>{players[0].nickname}</h2>
            <h4>Age: {players[0].age}</h4>
            <h4>Piece: {players[0].piece}</h4>
          </div>

          <div>
            <u>
              <h2 className="current-turn-header">Current Turn</h2>
            </u>

            <h2>
              {players[currentPlayerNumber - 1].nickname}
              {players[currentPlayerNumber - 1].piece}
            </h2>

            <div className="timer-container">
              <h3>Duration</h3>
              <h3 id="count_up_timer"></h3>
            </div>
          </div>

          <div
            className={`user-name-column ${
              currentPlayerNumber === 2 && "current-turn"
            }`}
          >
            <h2>{players[1].nickname}</h2>
            <h4>Age: {players[1].age}</h4>
            <h4>Piece: {players[1].piece}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsernameBanner;
