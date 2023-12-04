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

const isSymbol = (char?: string) => char !== undefined && !nummable(char) && char !== ".";

function neighorMapper(arr: string[], i: number, j: number) {
  const neighorsMap = {
    t: [i - 1, j],
    rt: [i - 1, j + 1],
    r: [i, j + 1],
    rb: [i + 1, j + 1],
    b: [i + 1, j],
    lb: [i + 1, j - 1],
    l: [i, j - 1],
    lt: [i - 1, j - 1],
  };

  return Object.values(neighorsMap).reduce((acc: Record<string, string | undefined>, [ii, jj]) => {
    acc[`${ii}${jj}`] = arr[ii]?.[jj];
    return acc;
  }, {});
}

function islandRunner(arr: string[]) {
  const gearLink: Record<keyof ReturnType<typeof neighorMapper>, string[]> = {};
  const parts: string[] = [];
  let symbolFound = false;
  let part = "";
  let starLocation = "";

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const cur = arr[i][j];
      const mappedNeighors = neighorMapper(arr, i, j);

      // part 2
      Object.entries(mappedNeighors).forEach(([k, v]) => {
        if (nummable(cur) && v === "*" && !starLocation) starLocation = k;
      });

      if (!nummable(cur)) {
        if (part && symbolFound) parts.push(part);
        if (part && starLocation) {
          if (!gearLink[starLocation]) gearLink[starLocation] = [];
          gearLink[starLocation].push(part);
        }
        symbolFound = false;
        part = "";
        starLocation = "";
        continue;
      }
      part += cur;

      // part 1
      if (symbolFound) continue;
      if (truthyCounter<string | undefined>(Object.values(mappedNeighors), isSymbol))
        symbolFound = true;
    }
  }
  return { parts, gearLink };
}

const { parts, gearLink } = islandRunner(input);

const part1 = parts.reduce((a, b) => +a + +b, 0);
const part2 = Object.values(gearLink)
  .filter((v) => v.length === 2)
  .reduce((acc, cur) => acc + +cur[0] * +cur[1], 0);

console.log({ part1, part2 });
