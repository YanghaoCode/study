//let a = Symbol('123');
//
//console.log("a", a);
//
//let b = Symbol('123');
//
//console.log("a===b", a===b);


//let obj = {
//  abc: 123,
//  "hello": "world"
//}
//
//obj["abc"] // 123
//obj["hello"] // 'world'

const PROP_NAME = Symbol(123)
const PROP_AGE = Symbol(234)

let obj = {
  [PROP_NAME]: "一斤代码",
  sex: 'boy',
  from: 'hunan',
  like: 'travle'
}
obj[PROP_AGE] = 18

obj[PROP_NAME] // '一斤代码'
obj[PROP_AGE] // 18


//action1
for (let i in obj) {
  console.log("i", i)
}
//action2
console.log("Object.keys(obj)",Object.keys(obj))

//action3
console.log("Object.getOwnPropertyNames(obj)",Object.getOwnPropertyNames(obj))

//action4
console.log("Object.getOwnPropertySymbols(obj)",Object.getOwnPropertySymbols(obj))

