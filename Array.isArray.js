
Array.isMyArray = function(arr) {
  //return arr instanceof Array
  //return arr.constructor === Array
  return Object.prototype.toString.call(arr) === '[object Array]'
};

let r = Array.isMyArray([1])

console.log("r", r)
