//Array.prototype.slice.call()
//这种方法是借用了数组原型中的slice方法，返回一个数组。slice方法的内部实现：

Array.prototype.myslice = function(start,end){
  var result = new Array();
  start = start || 0;
  end = end || this.length; //使用call之后this指向了类数组对象
  for(var i = start; i < end; i++){
    result.push(this[i]);
  }
  return result;
}

let newArr = arr.myslice(1,3)
console.log("newArr",newArr)
console.log("arr",arr);


