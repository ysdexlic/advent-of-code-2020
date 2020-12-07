import * as fs from 'fs'
import * as path from 'path'

console.log('=-=-=-=-=-=-=-=-=-=-= DAY 3 =-=-=-=-=-=-=-=-=-=-=')

const data: string[] = fs
  .readFileSync(path.join(__dirname, './input.txt'))
  .toString()
  .split('\n')
  .filter((l) => l !== '')

const part1 = (): number => {
  const IDs: number[] = []
  for (const entry of data) {
    IDs.push(findID(entry))
  }
  return IDs.sort((a, b) => a - b).pop()
}

const findID = (entry: string): number => {
  const instructions: string[] = entry.split('')
  let minRow: number = 0
  let maxRow: number = 127
  let minColumn: number = 0
  let maxColumn: number = 7
  for (const instruction of instructions) {
    switch (instruction) {
      case 'F': {
        maxRow -= (maxRow + 1 - minRow) / 2
        break
      }
      case 'B': {
        minRow += (maxRow + 1 - minRow) / 2
        break
      }
      case 'R': {
        minColumn += (maxColumn + 1 - minColumn) / 2
        break
      }
      case 'L': {
        maxColumn -= (maxColumn + 1 - minColumn) / 2
        break
      }
    }
  }

  return minRow * 8 + minColumn
}

const part2 = (): number => {
  const IDs: number[] = []
  for (const entry of data) {
    IDs.push(findID(entry))
  }
  const sortedSeats = IDs.sort((a, b) => a - b)
  let prev = -1
  for (const id of sortedSeats) {
    if (prev === -1) {
      prev = id
      continue
    }
    if (prev != id - 1) {
      return id - 1
    }
    prev = id
  }
}

console.log('part 1:', part1())
console.log('part 2:', part2())
