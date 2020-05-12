// import { foo } from './foo'
// const bar = foo

let numArr: number[] = [1, 2, 4]
let reversedNums = numArr.reverse()
reversedNums.push(3)
console.log(reversedNums)

interface Point {
  x: number
  y: number
}

class MyPoint implements Point {
  x: number
  y: number
}

console.log(Date.now())
