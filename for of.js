let arr = ['tom', 'jack', 'mary', 'harry'];


//for (let i in arr) {
//  console.log("i", i);
//}

for (let i of arr) {
  //console.log("i", i);
}


let obj = {
  name: 'tom',
  age: '18',
  sex: 'boy',
}

//for (let i in obj) {
//  console.log("i", i);
//}


//obj[Symbol.iterator] = ()=> {
//  return {
//    next(){
//      return {
//        done: false,
//        value:2
//      }
//    }
//  }
//}
for (let i of obj) {
  console.log("i", i);
}