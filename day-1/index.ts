import { data } from './data'

const part1 = (): number | void => {
  for (let i = 0; i < data.length - 1; i++) {
    const num = data[i]
    const target = 2020 - num

    if (data.indexOf(target) !== -1) {
      return num * target
    }
  }
}

const part2 = (): number | void => {
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const diff = 2020 - data[i] - data[j]
      const diffIndex = data.indexOf(diff, i + 1)
      if (diffIndex !== -1) {
        return data[i] * data[j] * diff
      }
    }
  }
}

console.log('part 1:', part1())
console.log('part 2:', part2())
