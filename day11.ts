import { getInput } from "./utils";

const input = await getInput(11);

// const sample = [
//   "...#......",
//   ".......#..",
//   "#.........",
//   "..........",
//   "......#...",
//   ".#........",
//   ".........#",
//   "..........",
//   ".......#..",
//   "#...#.....",
// ];

const EXPANSION = 1000000 - 1;

function generateGalaxyList(input: string[]) {
  const galaxyList: [number, number][] = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "#") galaxyList.push([x, y]);
    }
  }
  return galaxyList;
}

const galaxyList = generateGalaxyList(input);

const expandedX: number[] = [];
const expandedY: number[] = [];

for (let x = 0; x < input[0].length; x++) {
  if (input.every((row) => row[x] === ".")) {
    expandedX.push(x);
  }
}

input.forEach((row, y) => {
  if (!row.includes("#")) {
    expandedY.push(y);
  }
});

let totalDistance = 0;
for (let i = 0; i < galaxyList.length - 1; i++) {
  const [ax, ay] = galaxyList[i];
  for (let j = i + 1; j < galaxyList.length; j++) {
    const [bx, by] = galaxyList[j];
    let distance = Math.abs(ax - bx) + Math.abs(ay - by);

    expandedX.forEach((ex) => {
      if (Math.min(ax, bx) < ex && Math.max(ax, bx) > ex) distance += EXPANSION;
    });
    expandedY.forEach((ey) => {
      if (Math.min(ay, by) < ey && Math.max(ay, by) > ey) distance += EXPANSION;
    });
    totalDistance += distance;
  }
}

console.log(totalDistance);

// part1 9805264 answer

// too high 2796599313052
// too high 2796597898886
