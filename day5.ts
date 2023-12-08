import { getInput } from "./utils";

const input = await getInput(5, "\n\n");

// const sample = `
// seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4
// `.split("\n\n");

const mapKey = [
  "seed-to-soil map:",
  "soil-to-fertilizer map:",
  "fertilizer-to-water map:",
  "water-to-light map:",
  "light-to-temperature map:",
  "temperature-to-humidity map:",
  "humidity-to-location map:",
];

type TStoDMap = Record<string, number>[];
function mapSourceToDest(state: TStoDMap, arr: number[]) {
  const [destStart, sourceStart, range] = arr;

  state.push({
    low: sourceStart,
    high: sourceStart + range - 1,
    difference: destStart - sourceStart,
  });

  return state;
}

function part1(input: string[]) {
  const [rawSeeds, ...rawMaps] = input;
  const seeds = rawSeeds
    .split(": ")
    .pop()
    ?.split(" ")
    .map((s) => +s);

  const mapping = rawMaps.reduce((acc: Record<string, TStoDMap>, map) => {
    const [type, ...rangeMappings] = map.split("\n").filter(Boolean);

    acc[type] = rangeMappings
      .map((range) => range.split(" ").map((n) => +n))
      .reduce(mapSourceToDest, []);

    return acc;
  }, {});
  return { seeds, mapping };
}

function part1main(input: string[]) {
  let lowestLocation = Infinity;

  const { seeds, mapping } = part1(input);
  seeds?.forEach((seed) => {
    let cur = seed;
    mapKey.forEach((map) => {
      let found: boolean;
      const curMap = mapping[map];
      curMap.forEach(({ low, high, difference }) => {
        if (!found && cur >= low && cur <= high) {
          found = true;
          cur = cur + difference;
        }
      });
    });
    if (cur < lowestLocation) lowestLocation = cur;
  });
  return lowestLocation;
}

console.log(part1main(input));
