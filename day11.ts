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

function generateUniversalLists(universe: string[]) {
  const galaxyList: [number, number][] = [];
  const expandedX: number[] = [];
  const expandedY: number[] = [];

  for (let y = 0; y < universe.length; y++) {
    if (!universe[y].includes("#")) expandedY.push(y);

    for (let x = 0; x < universe[y].length; x++) {
      if (universe[y][x] === "#") galaxyList.push([x, y]);

      if (universe.every((row) => row[x] === ".")) {
        expandedX.push(x);
      }
    }
  }
  return { expandedX, expandedY, galaxyList };
}

const { expandedX, expandedY, galaxyList } = generateUniversalLists(input);

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
