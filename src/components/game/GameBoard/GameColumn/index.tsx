import "./index.scss";

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
