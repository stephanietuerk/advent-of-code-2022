export function sumNumberArray(numbers: number[]): number {
  return numbers.reduce((acc, item) => {
    acc = acc + item;
    return acc;
  }, 0);
}
