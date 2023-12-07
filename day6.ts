import { getInput } from "./utils";

const input = (await getInput(6)).map((row) => row.split(" ").filter(Boolean).slice(1));

// const sample = ["Time:      7  15   30", "Distance:  9  40  200"];

type Race = Record<"timeLimit" | "record", number>;
function findMarginOfError({ timeLimit, record }: Race) {
  let winRoutes = 0;

  for (let i = 1; i <= timeLimit; i++) {
    if (i * (timeLimit - i) > record) winRoutes++;
  }
  return winRoutes;
}

function part1(input: string[][]) {
  const [times, distances] = input.map((row) => row.map((n) => +n));

  const formattedData: Race[] = [];
  for (const i in times) {
    formattedData.push({ timeLimit: times[i], record: distances[i] });
  }

  return formattedData.map(findMarginOfError).reduce((a, b) => a * b);
}

function part2(input: string[][]) {
  const [timeLimit, record] = input.map((row) => +row.join(""));
  return findMarginOfError({ timeLimit, record });
}

console.log({ p1: part1(input), p2: part2(input) });
