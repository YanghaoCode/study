let obj = {
  name: 'jack',
  age: 18
}

function fn(a1, a2) {
  console.log("a1+a2", a1+a2)
  console.log("this", this)
  return a1+ a2
}

Function.prototype.mycall = function(obj) {
  obj.fn = this;
  let arg = [...arguments].slice(1);
  let result = obj.fn(...arg);
  delete obj.fn;
  if (result) return result
};

let r1 = fn.mycall(obj, 'hello', 'vue')

console.log("r1", r1)


Function.prototype.myapply = function(obj, agr) {
  obj.fn = this;
  let result;
  if (agr === undefined || agr === null) {
    result = obj.fn()
  } else {
    result = obj.fn(...agr)
  }
  delete obj.fn
  return result
}


Function.prototype.mybind = function(obj) {
  let agr1 = [...arguments].slice(1)
  let fn = this
  return function() {
    let agr2 = [...arguments];
    console.log("agr1", agr1, 'agr2', agr2)
    return fn.apply(obj, agr1.concat(agr2))
  }
}

let r3 = fn.mybind(obj)('hello ', 'vue')

console.log("r3", r3)
