let obj1 = {
  name: 'jack',
  age: {
    a: 19
  }
}

let obj2 = {
  name: 'jack',
  age: {
    a: 20
  }
}


function diff(obj1, obj2) {
  if(!(obj1 instanceof Object ) || !(obj2 instanceof Object))  {
    return false
  }
  if (Object.keys(obj1).length !== Object.keys(obj2),length) {
    return false
  }

  for (let i in obj1) {
    if (obj1[i] instanceof Object && obj2[i] instanceof Object) {
      return diff(obj1[i], obj2[i])
    }
    if (obj1[i] !== obj2[i]) {
      return false
    }
  }
  return true
}

console.log("diff", diff(obj1, obj2))