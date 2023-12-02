import { getInput } from "./utils";

const input = await getInput(1);

// const test1 = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"]; // 142
// const test2 = [
//   "two1nine",
//   "eightwothree",
//   "abcone2threexyz",
//   "xtwone3four",
//   "4nineeightseven2",
//   "zoneight234",
//   "7pqrstsixteen",
// ]; // 281

const nummable = (char: string) => !Number.isNaN(+char);

const filterNums = (str: string) =>
  str.split("").reduce((temp, char) => (nummable(char) ? temp + char : temp), "") || "0";

const endsAsNumber = (str: string) => Number(str[0] + str[str.length - 1]);

const bookendAdderReducer = (acc: number, str: string) => endsAsNumber(str) + acc;

const part1 = input.map(filterNums).reduce(bookendAdderReducer, 0);

const numMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const mapTextToNumber = (str: string) => {
  let temp = "";
  for (let i = 0; i < str.length; i++) {
    if (nummable(str[i])) {
      temp += str[i];
    } else {
      for (let j = i; j < str.length; j++) {
        const window = str.slice(i, j + 1) as keyof typeof numMap;
        if (numMap[window]) {
          temp += numMap[window];
          break;
        }
      }
    }
  }
  return temp;
};

const part2 = input.map(mapTextToNumber).reduce(bookendAdderReducer, 0);

console.log(part1);
console.log(part2);
