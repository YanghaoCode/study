let arr = [1,2,3,4,5,6]

let obj = {
  data:{
    newObj: {
      name:'jack'
    }
  }
}

Array.prototype.myMap = function(fn) {
  let arr = this;
  let newArr = []
  for (let i = 0; i <arr.length; i++) {
    newArr.push(fn(arr[i]))
  }
  return newArr
};

let result = arr.myMap(function(item) {
  return item + 2
})


Array.prototype.myEvery = function(fn) {
  let arr = this;
  for (let i = 0; i< arr.length; i++) {
    if (!fn(arr[i])) return false
  }
  return true
};

let result2 = arr.myEvery(item=>{
  console.log("item", item);
  return item>0
})

Array.prototype.mySome = function(fn) {
  let arr = this;
  for (let i=0; i< arr.length; i++) {
    if (fn(arr[i])) return true
  }
  return false
};

let result3 = arr.mySome(item=>{
  console.log("item", item)

  return item >2
});


Array.prototype.myFilter = function(fn) {
  let arr = this;
  let newArr = [];
  for (let i = 0; i< arr.length; i++) {
    if (fn(arr[i])) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

let result4 = arr.myFilter(item=>{
  console.log("item", item);
  return item>3
});

Array.prototype.myReduce = function(fn, num) {
  let arr = this;
  let result;
  if (typeof num === 'number') {
    result = fn(num, arr[0], 0, arr)
    result = fn(result, arr[1], 1, arr)
  } else {
    result = fn(arr[0], arr[1], 1, arr)
  }

  for (let i = 2; i< arr.length; i++) {
    result = fn(result, arr[i], i, arr)
  }
  return result
};

let result5 = arr.myReduce(function(pre, cur, index, arr) {
  console.log("pre",pre, 'cur', cur, 'index',index, "arr", arr)
  return pre+ cur
},2)



console.log("result",result)


