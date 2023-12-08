import { getInput, lcm } from "./utils";

const input = await getInput(8, "\n\n");

// const sample = `
// LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)
// `.split("\n\n");

const [directions, nodes] = input.map((l) => l.trim());

const nodeRegex = /(\w{3}) = \((\w{3}), (\w{3})\)/;
const nodeMap = nodes.split("\n").reduce((map: Record<string, Record<string, string>>, node) => {
  const [, K, L, R] = nodeRegex.exec(node) ?? [];
  map[K] = { L, R };
  return map;
}, {});

const pathCounter =
  (conditionalFn: (curArg: string) => boolean) =>
  (init = "AAA") => {
    let count = 0;
    let cur = init;
    let i = 0;

    while (!conditionalFn(cur)) {
      count++;
      cur = nodeMap[cur][directions[i]];
      if (++i === directions.length) i = 0;
    }
    return count;
  };

const part1 = pathCounter((n) => n === "ZZZ")();

function part2() {
  const resultsList = Object.keys(nodeMap)
    .filter((n) => n.endsWith("A"))
    .map((n) => pathCounter((c: string) => c.endsWith("Z"))(n));
  return lcm(resultsList);
}

console.log({ part1, part2: part2() }); // 1: 17287, 2: 18625484023687
