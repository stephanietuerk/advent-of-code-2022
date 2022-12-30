import { cloneDeep } from 'lodash-es';
import { getInputForDay } from '../utilities/get-input';
import { printResultForPart } from '../utilities/results';

interface Position {
  x: number;
  y: number;
}

type Direction = 'R' | 'U' | 'L' | 'D';

type Dimension = 'x' | 'y';

interface HeadMove {
  direction: Direction;
  count: number;
}

function init(): void {
  getInputForDay(9).then((input) => {
    const moves = getMoves(input);
    solvePart1(moves);
    solvePart2(moves);
  });
}

init();

function getMoves(input: string): HeadMove[] {
  return input.split('\n').map((move) => {
    const parts = move.split(' ');
    return { direction: parts[0] as Direction, count: +parts[1] as number };
  });
}

function solvePart1(moves: HeadMove[]): void {
  const numKnots = 2;
  const result = getUniqueTailPositionCountForNKnots(moves, numKnots);
  printResultForPart(result.length, 1);
}

function solvePart2(moves: HeadMove[]): void {
  const numKnots = 10;
  const result = getUniqueTailPositionCountForNKnots(moves, numKnots);
  printResultForPart(result.length, 2);
}

function getUniqueTailPositionCountForNKnots(
  moves: HeadMove[],
  numKnots: number
): Position[] {
  const startPosition: Position = { x: 0, y: 0 };
  const knotPositions: Position[] = Array(numKnots).fill(
    cloneDeep(startPosition)
  );
  const tailPositions: Position[] = [
    cloneDeep(knotPositions[knotPositions.length - 1]),
  ];
  moves.forEach((move) => {
    for (let i = 0; i < move.count; i++) {
      for (let k = 0; k < numKnots; k++) {
        if (k === 0) {
          knotPositions[k] = getNewHeadPosition(
            knotPositions[0],
            move.direction
          );
        } else {
          knotPositions[k] = getNewTailPosition(
            knotPositions[k],
            knotPositions[k - 1]
          );
        }
      }
      tailPositions.push(knotPositions[numKnots - 1]);
    }
  });
  return getUniquePositions(tailPositions);
}

function getNewHeadPosition(current: Position, direction: Direction): Position {
  switch (direction) {
    case 'R':
      return { x: current.x + 1, y: current.y };
    case 'L':
      return { x: current.x - 1, y: current.y };
    case 'U':
      return { x: current.x, y: current.y + 1 };
    case 'D':
      return { x: current.x, y: current.y - 1 };
  }
}

function getNewTailPosition(current: Position, head: Position): Position {
  const tail: Position = cloneDeep(current);
  [
    ['x', 'y'],
    ['y', 'x'],
  ].forEach((dim) => {
    updateDimensions(head, tail, dim[0] as Dimension, dim[1] as Dimension);
  });
  return tail;
}

function updateDimensions(
  leader: Position,
  follower: Position,
  primaryDimension: Dimension,
  secondaryDimension?: Dimension
): void {
  const maxDistance = secondaryDimension ? 1 : 0;
  if (leader[primaryDimension] - follower[primaryDimension] > maxDistance) {
    follower[primaryDimension]++;
    if (secondaryDimension) {
      updateDimensions(leader, follower, secondaryDimension);
    }
  } else if (
    follower[primaryDimension] - leader[primaryDimension] >
    maxDistance
  ) {
    follower[primaryDimension]--;
    if (secondaryDimension) {
      updateDimensions(leader, follower, secondaryDimension);
    }
  }
}

function getUniquePositions(positions: Position[]): Position[] {
  const uniques: Position[] = [];
  positions.forEach((p) => {
    if (
      uniques.length === 0 ||
      uniques.filter((pos) => pos.x === p.x && pos.y === p.y).length === 0
    ) {
      uniques.push(p);
    }
  });
  return uniques;
}
