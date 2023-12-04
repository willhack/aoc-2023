import { getInput, nummable, truthyCounter } from "./utils";

const input = await getInput(3);

// const sample = [
//   "467..114..",
//   "...*......",
//   "..35..633.",
//   "......#...",
//   "617*......",
//   ".....+.58.",
//   "..592.....",
//   "......755.",
//   "...$.*....",
//   ".664.598..",
// ];

const isSymbol = (char: string) => !nummable(char) && char !== undefined && char !== ".";

function neighorMapper(map: string[], i: number, j: number) {
  const t = map[i - 1]?.[j];
  const rt = map[i - 1]?.[j + 1];
  const r = map[i][j + 1];
  const rb = map[i + 1]?.[j + 1];
  const b = map[i + 1]?.[j];
  const lb = map[i + 1]?.[j - 1];
  const l = map[i][j - 1];
  const lt = map[i - 1]?.[j - 1];

  return (fn: (char: string) => boolean) => truthyCounter<string>([t, rt, r, rb, b, lb, l, lt], fn);
}

function islandRunner(arr: string[]) {
  const parts: string[] = [];
  let symbolFound = false;
  let part = "";

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const cur = arr[i][j];
      const neigborCounter = neighorMapper(arr, i, j);

      if (!nummable(cur)) {
        if (part.length && symbolFound) parts.push(part);
        symbolFound = false;
        part = "";
        continue;
      }
      part += cur;

      if (symbolFound) continue;
      if (neigborCounter(isSymbol)) symbolFound = true;
    }
  }
  return parts;
}

const part1Total = islandRunner(input).reduce((a, b) => +a + +b, 0);
console.log(part1Total);
