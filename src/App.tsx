import "./App.scss";
import { Routes, Route, Link } from "react-router-dom";
import ScoreBoard from "./components/scoreboard/ScoreBoard";
import Testpage from "./components/pages/testPage";
import AppPage from "./components/pages/appPage";

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
  return (
    <div className="App">
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to={"/"} className="nav-link">
                Game Board
              </Link>
            </li>

            <li>
              <Link to={"/scoreboard"} className="nav-link">
                Scoreboard
              </Link>
            </li>

            <li>
              <Link to={"/test"} className="nav-link">
                Test
              </Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<AppPage />} />
          <Route path="/test" element={<Testpage />} />
          <Route path="/scoreboard" element={<ScoreBoard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
