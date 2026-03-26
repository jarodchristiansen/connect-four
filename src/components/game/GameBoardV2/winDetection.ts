export function getClassListArray(cell: Element): string[] {
  return [...cell.classList];
}

export function getColorOfCell(
  cell: Element
): "yellow" | "red" | null {
  const classList = getClassListArray(cell);
  if (classList.includes("yellow")) return "yellow";
  if (classList.includes("red")) return "red";
  return null;
}

export function isBoardFull(rows: Element[][]): boolean {
  for (const row of rows) {
    for (const cell of row) {
      const classList = getClassListArray(cell);
      if (!classList.includes("yellow") && !classList.includes("red")) {
        return false;
      }
    }
  }
  return true;
}

/** Cells in a line through (row,col) along direction (dr,dc), including start, both ways. */
export function collectAlignedCells(
  rows: Element[][],
  row: number,
  col: number,
  dRow: number,
  dCol: number,
  color: "yellow" | "red"
): Element[] {
  const cells: Element[] = [rows[row][col]];
  let r = row + dRow;
  let c = col + dCol;
  while (r >= 0 && r < 6 && c >= 0 && c < 7 && getColorOfCell(rows[r][c]) === color) {
    cells.push(rows[r][c]);
    r += dRow;
    c += dCol;
  }
  r = row - dRow;
  c = col - dCol;
  while (r >= 0 && r < 6 && c >= 0 && c < 7 && getColorOfCell(rows[r][c]) === color) {
    cells.unshift(rows[r][c]);
    r -= dRow;
    c -= dCol;
  }
  return cells;
}

const WIN_DIRECTIONS: readonly [number, number][] = [
  [0, 1],
  [1, 0],
  [1, -1],
  [1, 1],
];

export function findWinningLine(
  rows: Element[][],
  row: number,
  col: number,
  color: "yellow" | "red"
): Element[] | null {
  for (const [dRow, dCol] of WIN_DIRECTIONS) {
    const line = collectAlignedCells(rows, row, col, dRow, dCol, color);
    if (line.length >= 4) return line;
  }
  return null;
}
