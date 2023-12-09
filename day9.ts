import { getInput } from "./utils";

const input = await getInput(9);
// const sample = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"];

type Sequence = number[];
const nothingBurger = (arr: Sequence) => arr.every((n) => n === 0);

const generateNextSequence = (arr: Sequence) => {
  const temp: Sequence = [];
  for (let i = 0; i < arr.length - 1; i++) {
    temp.push(arr[i + 1] - arr[i]);
  }
  return temp;
};

const ts = input
  .map((s) => s.split(" ").map((n) => +n))
  .map((sequence) => {
    const sequenceTree = [sequence];
    while (!nothingBurger(sequenceTree[sequenceTree.length - 1])) {
      sequenceTree.push(generateNextSequence(sequenceTree[sequenceTree.length - 1]));
    }
    // Part 1
    // return sequenceTree.reduce((acc, cur) => acc + cur[cur.length - 1], 0);

    // Part 2
    const t = sequenceTree.map((s) => [s[0]]);
    for (let i = t.length - 2; i >= 0; i--) {
      t[i].unshift(t[i][0] - t[i + 1][0]);
    }
    return t[0][0];
  });
console.log(ts.reduce((a, c) => a + c));
