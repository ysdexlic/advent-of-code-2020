import * as fs from 'fs'
import * as path from 'path'

console.log('=-=-=-=-=-=-=-=-=-=-= DAY 3 =-=-=-=-=-=-=-=-=-=-=')

const unformattedData: string[] = fs
  .readFileSync(path.join(__dirname, './input.txt'))
  .toString()
  .split('\n')

let entryList: string[] = []
const data: Array<Array<string>> = unformattedData.reduce((acc, curr) => {
  if (curr !== '') {
    entryList.push(curr)
  } else {
    const list = [...entryList]
    entryList = []
    return [...acc, list]
  }
  return [...acc]
}, [])

const part1 = (): number => {
  let count = 0
  for (const entry of data) {
    count += countAnswers(entry)
  }
  return count
}

const countAnswers = (group: string[]): number => {
  let chars = ''
  for (const answer of group) {
    for (const letter of answer) {
      if (!chars.includes(letter)) {
        chars += letter
      }
    }
  }
  return chars.length
}

const part2 = (): number => {
  let count = 0
  for (const entry of data) {
    count += countAnswersPart2(entry)
  }
  return count
}

const countAnswersPart2 = (group: string[]): number => {
  let chars: any = {}
  for (const answer of group) {
    for (const letter of answer) {
      chars[letter] = {
        ...chars[letter],
        count: (chars[letter]?.count || 0) + 1,
      }
    }
  }

  let count = 0
  Object.values(chars).map((char: any) => {
    if (char.count === group.length) {
      count += 1
    }
  })

  return count
}

console.log('part 1:', part1())
console.log('part 2:', part2())
