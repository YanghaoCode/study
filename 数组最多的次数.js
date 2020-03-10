function maxCountElement(arr) {
  var obj={};
  for(var i=0;i<arr.length;i++){
    var key=arr[i];
    if(obj[key]){
      obj[key]++;
    }else{
      obj[key]=1;
    }
  }

  var maxCount=0;
  var maxElement=arr[0];
  for(var key in obj){
    if(maxCount<obj[key]){
      maxCount=obj[key];
      maxElement=key;
    }
  }
  return maxCount

}

let arr = [1,3,6,7,4,3,3,3,4,5,5,5,5, 5,5];

maxCountElement(arr);


