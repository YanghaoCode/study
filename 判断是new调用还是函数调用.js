function Student(name, age) {
  this.name = name;
  this.age = age;
  console.log("arguments.callee", arguments.callee)
  return this instanceof arguments.callee
}


//let s1 = new Student('JACK', 18);

Student()