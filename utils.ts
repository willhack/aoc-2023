export async function getInput(day: number, parser: string = "\n") {
  const res = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
    headers: { cookie: process.env.AUTH as string },
  });
  return (await res.text()).trim().split(parser);
}

export const nummable = (char: string) => !Number.isNaN(+char);

export const truthyCounter = <T>(arr: T[], booleanFn: (args: T) => boolean) =>
  arr.reduce((acc, cur) => (booleanFn(cur) ? acc + 1 : acc), 0);

export const valueAdder = (obj: Record<string, number>) =>
  Object.values(obj).reduce((a, b) => a + b);

export const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));

export const lcm = (arr: number[]) => arr.reduce((lcm, cur) => (cur * lcm) / gcd(cur, lcm));
