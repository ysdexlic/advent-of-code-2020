import * as fs from 'fs'
import * as path from 'path'

console.log('=-=-=-=-=-=-=-=-=-=-= DAY 3 =-=-=-=-=-=-=-=-=-=-=')

const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']

const unformattedData: string[] = fs
  .readFileSync(path.join(__dirname, './input.txt'))
  .toString()
  .split('\n')

let entryList: string[] = []

const data: string[] = unformattedData.reduce((acc, curr) => {
  if (curr !== '') {
    entryList.push(curr)
  } else {
    const str = entryList.join(' ')
    entryList = []
    return [...acc, str]
  }
  return [...acc]
}, [])

const part1 = (): number => {
  let count = 0
  for (const entry of data) {
    if (isValidPart1(entry)) {
      count += 1
    }
  }
  return count
}

const isValidPart1 = (entry: string): boolean => {
  for (const field of fields) {
    if (field !== 'cid' && !entry.includes(field)) {
      return false
    }
  }
  return true
}

const fieldsPart2 = [
  {
    name: 'byr',
    validation: (v: string) => {
      v = v.split('byr:')[1].split(' ')[0]
      return parseInt(v) >= 1920 && parseInt(v) <= 2002
    },
  },
  {
    name: 'iyr',
    validation: (v: string) => {
      v = v.split('iyr:')[1].split(' ')[0]
      return parseInt(v) >= 2010 && parseInt(v) <= 2020
    },
  },
  {
    name: 'eyr',
    validation: (v: string) => {
      v = v.split('eyr:')[1].split(' ')[0]
      return parseInt(v) >= 2020 && parseInt(v) <= 2030
    },
  },
  {
    name: 'hgt',
    validation: (v: string) => {
      v = v.split('hgt:')[1].split(' ')[0]
      let valid: Function
      if (v.includes('cm')) {
        const hgt = parseInt(v.split('cm')[0])
        valid = () => hgt >= 150 && hgt <= 193
      } else {
        const hgt = parseInt(v.split('in')[0])
        valid = () => hgt >= 59 && hgt <= 76
      }
      return valid()
    },
  },
  {
    name: 'hcl',
    validation: (v: string) => {
      v = v.split('hcl:')[1].split(' ')[0]
      return v.match('#[a-z|0-9]{6}')
    },
  },
  {
    name: 'ecl',
    validation: (v: string) => {
      v = v.split('ecl:')[1].split(' ')[0]
      const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
      return !!colors.includes(v)
    },
  },
  {
    name: 'pid',
    validation: (v: string) => {
      v = v.split('pid:')[1].split(' ')[0]
      return v.length === 9
    },
  },
]

const part2 = (): number => {
  let count = 0
  for (const entry of data) {
    if (isValidPart2(entry)) {
      count += 1
    }
  }
  return count
}

const isValidPart2 = (entry: string): boolean => {
  for (const field of fieldsPart2) {
    if (
      (field.name !== 'cid' && !entry.includes(field.name)) ||
      !field.validation(entry)
    ) {
      return false
    }
  }
  return true
}

console.log('part 1:', part1())
console.log('part 2:', part2())
