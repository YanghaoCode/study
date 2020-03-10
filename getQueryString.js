function getQueryString(key) {
  let search = location.search;
  search = search.substring(1)
  let arr = search.split('&')

  for(let i in arr) {
    let queryArr = arr[i].split('=');
    obj[queryArr[0]] = queryArr[1]
    if (queryArr[0] === key) {
      return queryArr[1]
    }
  }
}

console.log("getQueryString('name')", getQueryString('name'))

function getQueryObject() {
  let search = location.search;
  search = search.substring(1)
  let arr = search.split('&')

  let obj = {}
  for(let i in arr) {
    let queryArr = arr[i].split('=');
    obj[queryArr[0]] = queryArr[1]
  }
  return obj
}
