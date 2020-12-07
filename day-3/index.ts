import * as fs from 'fs'
import * as path from 'path'

console.log('=-=-=-=-=-=-=-=-=-=-= DAY 3 =-=-=-=-=-=-=-=-=-=-=')

const unformattedData = fs
  .readFileSync(path.join(__dirname, './input.txt'))
  .toString()

const data: string[] = unformattedData.split('\n')

const part1 = ({
  x: xIncrement = 3,
  y: yIncrement = 1,
}: {
  x?: number
  y?: number
}): number => {
  let x = 0
  let count = 0
  for (let y = yIncrement; y < data.length; y += yIncrement) {
    x += xIncrement
    if (x >= data[y].length) {
      x -= data[y].length
    }
    if (willBeTree({ x, y })) {
      count += 1
    }
  }
  return count
}

const willBeTree = ({ x, y }: { x: number; y: number }): boolean => {
  if (data[y].charAt(x) === '#') {
    return true
  }
  return false
}

const part2 = (): number => {
  const possibleDirections = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ]

  let total = 1
  for (const direction of possibleDirections) {
    total *= part1(direction)
  }

  return total
}

console.log('part 1:', part1({}))
console.log('part 2:', part2())
