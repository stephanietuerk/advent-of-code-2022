import { descending, max, sort } from 'd3';
import { getInputForDay } from '../utilities/get-input';
import { sumNumberArray } from '../utilities/numbers';
import { printResultForPart } from '../utilities/results';

function init(): void {
  getInputForDay(1).then((input) => {
    const foodByElf = getFoodByElf(input);
    solvePart1(foodByElf);
    solvePart2(foodByElf);
  });
}

function solvePart1(foodByElf: number[]): void {
  const result = max(foodByElf);
  printResultForPart(result, 1);
}

function solvePart2(foodByElf: number[]): void {
  const topThree = sort(foodByElf.slice(), descending).slice(0, 3);
  const result = sumNumberArray(topThree);
  printResultForPart(result, 2);
}

function getFoodByElf(input: string): number[] {
  return input.split('\n\n').map((elfString) => sumFoodForElf(elfString));
}

function sumFoodForElf(elfString: string): number {
  const items = elfString.split('\n').map((x) => +x);
  return sumNumberArray(items);
}

init();
