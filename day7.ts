import { getInput } from "./utils";

const input = await getInput(7);

// const sample = [
//   "32T3K 765",
//   "T55J5 684",
//   "KK677 28",
//   "KTJJT 220",
//   "QQQJA 483",
// ];

const strengthMap: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

/*
Five of a kind  --> 7
Four of a kind  --> 6
Full house      --> 5
Three of a kind --> 4
Two pair        --> 3
One pair        --> 2
High card       --> 1
 */
function calculateStrength(countedCardValues: number[], jokers = 0) {
  const max = Math.max(...countedCardValues, 0) + jokers;
  if (max === 5) return 7;
  if (max === 4) return 6;
  if (max === 3)
    return (!jokers && countedCardValues.includes(2)) ||
      countedCardValues.filter((n) => n === 2).length === 2
      ? 5
      : 4;
  if (max === 2) return jokers || countedCardValues.filter((n) => n === 2).length === 1 ? 2 : 3;
  return 1;
}

const parseInput = (input: string[]) =>
  input.map((h) => {
    const [hand, rawBid] = h.split(" ");
    const cardCounter = hand.split("").reduce((acc: Record<string, number>, cur) => {
      acc[cur] = ++acc[cur] || 1;
      return acc;
    }, {});

    return {
      hand,
      bid: +rawBid,
      cardCounter,
    };
  });

const part1Transform = (parsedInput: ReturnType<typeof parseInput>) =>
  parsedInput.map((hand) => ({
    ...hand,
    strength: calculateStrength(Object.values(hand.cardCounter)),
  }));

const part2Transform = (parsedInput: ReturnType<typeof parseInput>) =>
  parsedInput.map((hand) => {
    const jokers = hand.cardCounter.J ?? 0;
    delete hand.cardCounter.J;
    return {
      ...hand,
      strength: calculateStrength(Object.values(hand.cardCounter), jokers),
    };
  });

type Transformer = typeof part1Transform | typeof part2Transform;

function compareHands<T extends ReturnType<Transformer>[number]>(a: T, b: T) {
  if (a.strength === b.strength) {
    for (let i = 0; i < 5; i++) {
      if (a.hand[i] === b.hand[i]) continue;
      return strengthMap[a.hand[i]] - strengthMap[b.hand[i]];
    }
  }
  return a.strength - b.strength;
}

const totalWinnings = (fn: Transformer) =>
  fn(parseInput(input))
    .sort(compareHands)
    .reduce((acc, cur, i) => acc + cur.bid * (i + 1), 0);

console.log(totalWinnings(part1Transform));
strengthMap.J = 1;
console.log(totalWinnings(part2Transform));
