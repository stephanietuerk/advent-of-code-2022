import { getInputForDay } from '../utilities/get-input';
import { printResultForPart } from '../utilities/results';

class Noop {
  cycles = 1;
  add = 0;
}

class AddX {
  cycles = 2;
  add: number;
  constructor(num: number) {
    this.add = num;
  }
}

type Instruction = Noop | AddX;

function init(): void {
  getInputForDay(10).then((input) => {
    const inputs = getInstructionsFromInput(input);
    const register = getRegisterValuesForCycles(inputs);
    solvePart1(register);
    solvePart2(register);
  });

  function getInstructionsFromInput(input: string): Instruction[] {
    return input.split('\n').map((line) => {
      const parts = line.split(' ');
      let instruction;
      if (parts[1]) {
        instruction = new AddX(+parts[1]);
      } else {
        instruction = new Noop();
      }
      return instruction;
    });
  }

  function getRegisterValuesForCycles(inputs: Instruction[]): number[] {
    const register = [1];
    inputs.forEach((input: Instruction) => {
      Array(input.cycles)
        .fill(0)
        .forEach((x, i) => {
          if (i === 0) {
            register.push(register[register.length - 1]);
          } else {
            register.push(register[register.length - 1] + input.add);
          }
        });
    });
    return register;
  }

  function solvePart1(register: number[]): void {
    const sum = [20, 60, 100, 140, 180, 220].reduce((acc, cur) => {
      acc = acc + register[cur - 1] * cur;
      return acc;
    }, 0);
    printResultForPart(sum, 1);
  }

  function solvePart2(register: number[]): void {
    const printed = register.map((regValue, i) => {
      const spritePosition = [regValue - 1, regValue, regValue + 1];
      if (spritePosition.includes(i % 40)) {
        return '#';
      } else {
        return '.';
      }
    });
    const lines: string[] = [];
    let newLine: string[];
    printed.forEach((char, i) => {
      if (i % 40 === 0) {
        newLine = [char];
      } else {
        newLine.push(char);
        if (i % 40 === 39) {
          lines.push(newLine.join(''));
        }
      }
    });
    lines.forEach((l) => console.log(l));
  }
}

init();
