import { data as unformattedData } from './data'

const data = unformattedData.split('\n')

const part1 = (): number => {
  let count = 0
  for (const entry of data) {
    if (passwordValidPart1(entry)) {
      count += 1
    }
  }
  return count
}

const passwordValidPart1 = (entry: string): boolean => {
  const [policy, password] = entry.split(':')
  const [range, letter] = policy.split(' ')
  const [minRangeStr, maxRangeStr] = range.split('-')
  const minRange = parseInt(minRangeStr)
  const maxRange = parseInt(maxRangeStr)

  let occurances = 0
  for (const char of password) {
    if (char === letter) {
      occurances += 1
    }
  }

  if (occurances < minRange || occurances > maxRange) {
    return false
  }
  return true
}

const part2 = (): number => {
  let count = 0
  for (const entry of data) {
    if (passwordValidPart2(entry)) {
      count += 1
    }
  }
  return count
}

const passwordValidPart2 = (entry: string): boolean => {
  const [policy, password] = entry.split(':')
  const [range, letter] = policy.split(' ')
  const [position1Str, position2Str] = range.split('-')
  const position1 = parseInt(position1Str)
  const position2 = parseInt(position2Str)

  let occurances = 0
  if (password.charAt(position1) === letter) occurances += 1
  if (password.charAt(position2) === letter) occurances += 1

  if (occurances != 1) {
    return false
  }

  return true
}

console.log('part 1:', part1())
console.log('part 2:', part2())
