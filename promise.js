function MyPromise(fn) {
  this.status = 'pending';
  this.result = '';
  this.reason = '';
  this.resolveArr = [];
  this.rejectArr = [];
  let self = this;

  function resolve(result) {
    if (self.status === 'pending') {
      self.result = result;
      self.status = 'resolved';
      self.resolveArr.forEach(fn=>{
        fn(result)
      })
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
      self.rejectArr.forEach(fn=>{
        fn(reason)
      })
    }
  }
  try {
    fn(resolve, reject)
  } catch {
    reject()
  }
}

MyPromise.prototype.then = function(resolveFn, rejectFn) {
  let self = this;
  return new MyPromise1(function(resolve, reject) {
    if (self.status === 'pending') {
      self.resolveArr.push(()=> {
        let result = resolveFn(self.value)
        resolve(result)
      })
      self.rejectArr.push(()=>{
        let result = rejectFn(self.reason);
        resolve(result)
      })
    }

    if (self.status === 'resolved') {
      let result = resolveFn(self.value)
      resolve(result)
    }

    if (self.status === 'rejected') {
      let result = rejectFn(self.reason)
      resolve(result)
    }
  })
}

//MyPromise.prototype.finally = function (callback) {
//  return this.then((value) => {
//    return Promise.resolve(callback()).then(() => {
//      return value;
//    });
//  }, (err) => {
//    return Promise.resolve(callback()).then(() => {
//      throw err;
//    });
//  });
//}

let p = new MyPromise(function(resolve, reject) {
  setTimeout(()=>{
    resolve(111)
  },1000)
});

p.then(function(data) {
  console.log("data",data);
  return 222
}, function(err) {
  console.log("err", err)
}).then(function(data) {
  console.log("data222", data)
})

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    let result = [];
    let index = 0;
    for (let key in arr) {
      Promise.resolve(arr[key]).then(data=>{
        doone(key, data)
      }, err=>{
        reject(err)
      })
    }

    function doone(i, data) {
      result[i] = data
      index++;
      if (index === arr.length) {
        resolve(result)
      }
    }
  })
};

let p1 = new Promise(function(resolve, reject) {
  setTimeout(()=>{
    resolve(111)
  },1000)
});
let p2 = new Promise(function(resolve, reject) {
  setTimeout(()=>{
    resolve(222)
  },200)
});
let p3 = new Promise(function(resolve, reject) {
  setTimeout(()=>{
    resolve(333)
  },100)
});

Promise.all([p1, p2, p3]).then(function(json) {
  console.log("all json", json);
})



Promise.mrace = function(arr) {
  return new Promise(function(resolve, reject) {
    for (let i in arr) {
      Promise.resolve(arr[i]).then(data=>{
        resolve(data)
      },err=>{
        reject(err)
      })
    }
  })
}


Promise.mrace([p1, p2, p3]).then(function(json) {
  console.log("json race", json);
})



p4.then(function(data) {
  console.log("data",data);
  return 222
}, function(err) {
  console.log("err", err)
}).then(function(data) {
  console.log("data222", data)
})