import { getInput } from "./utils";

const input = await getInput(2);

// const input = [
//   "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
//   "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
//   "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
//   "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
//   "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
// ] as const;

const cubePool = {
  red: 12,
  green: 13,
  blue: 14,
};

const possible = (minRoundValues: typeof cubePool) =>
  (["red", "green", "blue"] as const).every((color) => cubePool[color] >= minRoundValues[color]);

let sumOfPossibleRounds = 0;
let sumOfPowers = 0;
input.map((line) => {
  const temp = { red: 0, green: 0, blue: 0 };

  const [game, rounds] = line.split(": ");
  rounds.split("; ").map((round) => {
    round.split(", ").map((numColor) => {
      const [num, color] = numColor.split(" ") as [string, keyof typeof temp];
      if (temp[color] < +num) {
        temp[color] = +num;
      }
    });
  });

  if (possible(temp)) {
    sumOfPossibleRounds += +game.slice(5);
  }

  sumOfPowers += Object.values(temp).reduce((a, b) => a * b, 1);
});

console.log({
  part1: sumOfPossibleRounds,
  part2: sumOfPowers,
});
