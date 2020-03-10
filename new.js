
function Student(name, age) {
  this.name = name;
  this.age = age;
}

Student.prototype.sayHi = function() {
  console.log("sayhi...")
}

//let s1 = new Student('jack', 18);


function createNew(fn) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let result = fn.apply(obj, [...arguments].slice(1));
  if (result) {
    return result
  } else {
    return obj
  }
}

let s1 = createNew(Student, 'tom', 20)
console.log("s1", s1);

