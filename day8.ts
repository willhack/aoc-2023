import { getInput } from "./utils";

const input = await getInput(8, "\n\n");

const sample = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

const nodeRegex = /([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/;

const [directions, nodes] = input.map((l) => l.trim());

const nodeMap = nodes.split("\n").reduce((map: Record<string, Record<string, string>>, node) => {
  const [, K, L, R] = nodeRegex.exec(node) ?? [];
  map[K] = { L: L, R: R };
  return map;
}, {});

let count = 0;
let cur = "AAA";
let i = 0;

while (cur !== "ZZZ") {
  count++;
  cur = nodeMap[cur][directions[i]];
  if (++i === directions.length) i = 0;
}

console.log(count);
