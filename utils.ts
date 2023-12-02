export async function getInput(day: number) {
  const res = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
    headers: { cookie: process.env.AUTH as string },
  });
  return (await res.text()).trim().split("\n");
}
