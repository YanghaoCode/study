function test(name, age, sex) {
  //let agr = arguments
  //let agr = [...arguments]
  //let agr = Array.from(arguments)
  //let agr = Array.prototype.slice.call(arguments)
  let agr = [].slice.call(arguments)
  console.log("agr",agr)
}

test("name", "age" ,"sex")


let arr = [1,2,3,4,5]

console.log("result",result)