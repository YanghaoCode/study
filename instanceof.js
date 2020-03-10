function myInstanceof(left, right) {
  let l = left.__proto__;

  while (true) {
    if (l === undefined || l === null) {
      return false
    }
    if (l === right.prototype) {
      return true
    }
    l = l.__proto__
  }

}



let r = myInstanceof([1,2], Function)
console.log("r", r)