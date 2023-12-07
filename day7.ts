import { getInput } from "./utils";

const input = await getInput(7);

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
Five of a kind: AAAAA - 1 kind
Four of a kind: AA8AA - 2 kinds - max 4
Full house: 23332 - 2 kinds - max 3
Three of a kind: TTT98 - 3 kinds - max 3
Two pair: 23432 - 3 kinds - max 2
One pair: A23A4 - 4 kinds
High card: 23456 - 5 kinds
 */
function calculateStrength(countedCardValues: number[]) {
  const uniqueCardCount = countedCardValues.length;
  if (uniqueCardCount === 1) return 7;
  if (uniqueCardCount === 2) {
    return Math.max(...countedCardValues) === 4 ? 6 : 5;
  }
  if (uniqueCardCount === 3) {
    return Math.max(...countedCardValues) === 3 ? 4 : 3;
  }
  if (uniqueCardCount === 4) return 2;
  return 1;
}

const sample = [
  // "32T3K 765",
  // "T55J5 684",
  // "KK677 28",
  // "KTJJT 220",
  // "QQQJA 483",
  "AAAAA 1",
  "AA8AA 1",
  "23332 1",
  "TTT98 1",
  "23432 1",
  "A23A4 1",
  "23456 1",
  "KJKJK 1",
  "JKJKJ 1",
];

function parseInput(input: string[]) {
  return input.map((h) => {
    const [unsortedHand, rawBid] = h.split(" ");
    const cardCounter = unsortedHand.split("").reduce((acc: Record<string, number>, cur) => {
      acc[cur] = ++acc[cur] || 1;
      return acc;
    }, {});

    const strength = calculateStrength(Object.values(cardCounter));

    // well we don't need THIS logic...not real poker
    // let hand = "";
    // while (Object.values(cardCounter).length) {
    //   let max = { key: "", count: 0 };
    //   for (const [card, num] of Object.entries(cardCounter)) {
    //     if (num > max.count || (num === max.count && strengthMap[card] > strengthMap[max.key])) {
    //       max = { key: card, count: num };
    //     }
    //   }
    //   hand += max.key.repeat(max.count);
    //   delete cardCounter[max.key];
    // }

    return {
      hand: unsortedHand,
      bid: +rawBid,
      strength,
    };
  });
}

type Hand = ReturnType<typeof parseInput>[number];
function compareHands(a: Hand, b: Hand) {
  if (a.strength === b.strength) {
    for (let i = 0; i < 5; i++) {
      if (a.hand[i] === b.hand[i]) continue;
      return strengthMap[a.hand[i]] - strengthMap[b.hand[i]];
    }
  }
  return a.strength - b.strength;
}

const totalWinnings = parseInput(input)
  .sort(compareHands)
  // .map((h) => h.hand);
  .reduce((acc, cur, i) => acc + cur.bid * (i + 1), 0);

console.log(totalWinnings);

// sort based on hand strength
// profit
