import { chain, CollectionChain } from 'lodash'

interface User {
  user: string
  age: number
}
let users: User[] = [
  { user: 'barney', age: 36 },
  { user: 'fred', age: 40 },
  { user: 'pebbles', age: 1 }
]

let youngest: CollectionChain<User> = chain(users)

console.log(users)
console.log(
  youngest
    .sortBy('age')
    .map((item: User) => `${item.user} is ${item.age}`)
    .head()
    .value()
)
