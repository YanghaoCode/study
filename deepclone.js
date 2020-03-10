let obj = {
  a:1,
  b:2,
  c:{d:1},
  e:[1,2,3]
}

function deepclone(obj) {
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  let newObj = obj instanceof Array? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (obj[i] instanceof Array || obj[i] instanceof Object) {
        newObj[i] = deepclone(obj[i])
      } else {
        newObj[i] = obj[i]
      }
    }
  }
  return newObj
}

let obj2 = deepclone(obj)

console.log("deep", obj2)