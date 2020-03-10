let arr = [4,2,53,5,1,2,6,7]

//1、冒泡排序

function maopao(arr) {
  for (let j = arr.length-1; j>0; j--) {
    for (let i = 0; i <j; i++) {
      if (arr[i]> arr[i+1]) {
        let temp = arr[i+1];
        arr[i+1] = arr[i];
        arr[i] = temp
      }
    }
  }
  //console.log("arr",arr)
}
maopao(arr)


//2、选择排序

function selection(arr) {
  let min = 0
  for (let i = 0; i< arr.length-1; i++) {
    min = i
    for (let j = i+1; j< arr.length; j++) {
      if (arr[j]<arr[min]) {
        min = j
      }
    }
    let temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  console.log("arr select", arr)
  return arr
}

selection(arr);