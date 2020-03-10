let obj = Object.create({}, {
  a: {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: true
  },
  b: {
    value: 2,
    writable: true,
    enumerable: true,
    configurable: true
  },
  d: {
    value: 3,
    writable: true,
    enumerable: false,
    configurable: true
  }
})
obj.__proto__.c = 'food'

for (let i in obj) {
  console.log("i forin", i)
}

//从输出可以看出，for in会输出自身以及原型链上可枚举的属性。

console.log("Object.keys(obj)",Object.keys(obj))

//可以看出Object.keys的效果和for in+hasOwnProperty的效果是一样的。不含不可枚举的

console.log("Object.getOwnPropertyNames", Object.getOwnPropertyNames(obj))

//Object.getOwnPropertyNames也是es5中新增的方法，用来获取对象自身的全部属性名。包括不可枚举的

console.log("Object.getOwnPropertySymbols(obj)",Object.getOwnPropertySymbols(obj))
//Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。*/

