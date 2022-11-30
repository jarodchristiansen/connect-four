import "./index.scss";

/**
 *
 * @property col: Column location to search/add cell to
 * @property idx: Current index to add/search for cell
 * @proprety onCLick: click function to add piece
 * @returns GameColumns for GameBoardV1 (no longer in use)
 */

// @ts-ignore
const GameColumn = ({ col, idx, onClick }) => {
  return (
    <div className="column" key={`col-${idx}`} onClick={onClick}>
      {col.map((cell: any, x: any) => {
        return (
          <span className="cell" key={`cell-${idx}-${x}`}>
            {cell}
          </span>
        );
      })}
    </div>
  );
};

export default GameColumn;
