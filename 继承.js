function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function() {
  console.log("say hi")
}

function Student(name, age, sex) {
  Person.call(this, name, age);
  this.sex = sex;
}

//Student.prototype = new Person()
//Student.prototype.constructor = Student

Student.prototype = Object.assign(Person.prototype, {
  constructor: Student
})

let p1 = new Person("jack", 18);
console.log("p1", p1);

let s1 = new Student('tom', 20, 'boy');
console.log("s1",s1);