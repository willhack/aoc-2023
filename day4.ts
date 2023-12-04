import { getInput, valueAdder } from "./utils";

const input = await getInput(4);

// const sample = [
//   "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
//   "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
//   "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
//   "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
//   "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
//   "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
// ];

function cardCalculator(arr: string[]) {
  const totals: Record<string, number> = {};
  const numbersOfCards: Record<number, number> = {};

  arr.forEach((card) => {
    let copyCount = 0;
    const [cn, cards] = card.split(":");
    const cardNum = +cn.slice(5);
    const temp: Record<number, number> = {};
    const [winningNums, cardNums] = cards.split("|").map((nums) =>
      nums
        .split(" ")
        .filter(Boolean)
        .map((num) => +num)
    );

    cardNums.forEach((num) => {
      if (winningNums.includes(num)) {
        totals[cardNum] ? (totals[cardNum] *= 2) : (totals[cardNum] = 1);
        copyCount++;
      }
    });
    // part2
    // generate copy wins map
    for (let i = cardNum + 1; i <= arr.length && copyCount; i++) {
      temp[i] ? (temp[i] += 1) : (temp[i] = 1);
      copyCount--;
    }

    numbersOfCards[cardNum] = ++numbersOfCards[cardNum] || 1;
    const multiplier = numbersOfCards[cardNum];
    Object.entries(temp).forEach(([c, n]) => {
      numbersOfCards[+c]
        ? (numbersOfCards[+c] += n * multiplier)
        : (numbersOfCards[+c] = multiplier);
    });
  });
  return { numbersOfCards, totals };
}

const { numbersOfCards, totals } = cardCalculator(input);

console.log({
  part1: valueAdder(totals),
  part2: valueAdder(numbersOfCards),
});
