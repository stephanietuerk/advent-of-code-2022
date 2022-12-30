import * as fs from 'node:fs/promises';
import { getErrorMessage, reportError } from './errors';

export async function getInputForDay(day: number): Promise<string> {
  const pathToFile = `src/day${day}/input.txt`;
  try {
    const input = await fs.readFile(pathToFile, 'utf8');
    return input;
  } catch (error) {
    reportError({ message: getErrorMessage(error) });
    return '';
  }
}
