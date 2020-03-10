function sum(a,b,c) {
  return a+b+c;
}

console.log("sum", sum(1,2,3))

let sumFn = curry(sum);
//sumFn(1)(2)(3)
console.log("sumFn(1)(2)(3)",sumFn(1)(2)(3));
console.log("sumFn(1)(2,3)",sumFn(1)(2,3));

function curry(fn, args = []) {
  return function(){
    let rest = [...args, ...arguments];
    if (rest.length < fn.length) {
      return curry.call(this,fn,rest);
    }else{
      return fn.apply(this,rest);
    }
  }
}