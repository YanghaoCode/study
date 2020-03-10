let str = '1234567'

function fanzhuan(str) {
  let arr = str.split('');
  return arr.reverse().join('');
}

function fanzhuan1(str) {
  let arr = str.split('');
  let newArr = [];

  for (let i in arr) {
    newArr.unshift(arr[i])
  }
  return newArr.join('')
}

function fanzhuan2(str) {
  let arr = str.split('');
  let newStr = ''
  for (let i =arr.length-1; i>=0; i--) {
    newStr += arr[i]
  }
  return newStr
}

console.log("fanzhuan", fanzhuan2(str))

