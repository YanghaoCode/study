/*
* async/await是什么？
我们创建了 promise 但不能同步等待它执行完成。我们只能通过 then 传一个回调函数这样很容易再次陷入 promise 的回调地狱。
实际上，async/await 在底层转换成了 promise 和 then 回调函数。也就是说，这是 promise 的语法糖。每次我们使用 await, 解释器都创建一个 promise 对象，
然后把剩下的 async 函数中的操作放到 then 回调函数中。async/await 的实现，离不开 Promise。从字面意思来理解，async 是“异步”的简写，
而 await 是 async wait 的简写可以认为是等待异步方法执行完成。

async/await用来干什么？
用来优化 promise 的回调问题，被称作是异步的终极解决方案。

async/await内部做了什么？
async 函数会返回一个 Promise 对象，如果在函数中 return 一个直接量（普通变量），
async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。如果你返回了promise那就以你返回的promise为准。
await 是在等待，等待运行的结果也就是返回值。await后面通常是一个异步操作（promise），但是这不代表 await 后面只能跟异步操作 await 后面实际是可以接普通函数调用或者直接量的。

await的等待机制？
如果 await 后面跟的不是一个 Promise，那 await 后面表达式的运算结果就是它等到的东西；
如果 await 后面跟的是一个 Promise 对象，await 它会“阻塞”后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值作为 await 表达式的运算结果。
但是此“阻塞”非彼“阻塞”这就是 await 必须用在 async 函数中的原因。
async 函数调用不会造成“阻塞”，它内部所有的“阻塞”都被封装在一个 Promise 对象中异步执行。（这里的阻塞理解成异步等待更合理）

async/await在使用过程中有什么规定？
每个 async 方法都返回一个 promise 对象。await 只能出现在 async 函数中。
async/await 在什么场景使用？
单一的 Promise 链并不能发现 async/await 的优势，但是如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它）。

链接：https://juejin.im/post/5c148ec8e51d4576e83fd836
* */

function myPromise(n) {
  return new Promise(resolve => {
    console.log(n)
    setTimeout(() => resolve(n+1), n)
  })
}
function step1(n) {
  return myPromise(n)
}
function step2(n) {
  return myPromise(n)
}
function step3(n) {
  return myPromise(n)
}

//如果用 Promise 实现
step1(1000)
.then(a => step2(a))
.then(b => step3(b))
.then(result => {
  console.log(result)
})


//如果用 async/await 来实现呢
async function myResult() {
  const a = await step1(1000)
  const b = await step2(a)
  const result = await step3(b)
  return result
}
myResult().then(result => {
  console.log(result)
}).catch(err => {
  // 如果myResult内部有语法错误会触发catch方法
})


/*
* 看的出来async/await的写法更加优雅一些要比Promise的链式调用更加直观也易于维护。
我们来看在任务队列中async/await的运行机制，先给出大概方向再通过案例来证明：

async定义的是一个Promise函数和普通函数一样只要不调用就不会进入事件队列。
async内部如果没有主动return Promise，那么async会把函数的返回值用Promise包装。
await关键字必须出现在async函数中，await后面不是必须要跟一个异步操作，也可以是一个普通表达式。
遇到await关键字，await右边的语句会被立即执行然后await下面的代码进入等待状态，等待await得到结果。
await后面如果不是 promise 对象, await会阻塞后面的代码，先执行async外面的同步代码，同步代码执行完，
再回到async内部，把这个非promise的东西，作为 await表达式的结果。
await后面如果是 promise 对象，await 也会暂停async后面的代码，先执行async外面的同步代码，
等着 Promise 对象 fulfilled，然后把 resolve 的参数作为 await 表达式的运算结果。
* */

setTimeout(function () {
  console.log('6')
}, 0)
console.log('1')
async function async1() {
  console.log('2')
  await async2()
  console.log('5')
}
async function async2() {
  console.log('3')
}
async1()
console.log('4')


/*6是宏任务在下一轮事件循环执行
先同步输出1，然后调用了async1()，输出2。
await async2() 会先运行async2()，5进入等待状态。
输出3，这个时候先执行async函数外的同步代码输出4。
最后await拿到等待的结果继续往下执行输出5。
进入第二轮事件循环输出6。*/


console.log('1')
async function async1() {
  console.log('2')
  await 'await的结果'
  console.log('5')
}

async1()
console.log('3')

new Promise(function (resolve) {
  console.log('4')
  resolve()
}).then(function () {
  console.log('6')
})


/*
* 首先输出1，然后进入async1()函数，输出2。
await后面虽然是一个直接量，但是还是会先执行async函数外的同步代码。
输出3，进入Promise输出4，then回调进入微任务队列。
现在同步代码执行完了，回到async函数继续执行输出5。
最后运行微任务输出6。

* */


async function async1() {
  console.log('2')
  await async2()
  console.log('7')
}

async function async2() {
  console.log('3')
}

setTimeout(function () {
  console.log('8')
}, 0)

console.log('1')
async1()

new Promise(function (resolve) {
  console.log('4')
  resolve()
}).then(function () {
  console.log('6')
})
console.log('5')

/*
* 首先输出同步代码1，然后进入async1方法输出2。
因为遇到await所以先进入async2方法，后面的7处于等待状态。
在async2中输出3，现在跳出async函数先执行外面的同步代码。
输出4，5。then回调进入微任务栈。
现在宏任务执行完了，执行微任务输出6。
然后回到async1函数接着往下执行输出7。
* */


setTimeout(function () {
  console.log('9')
}, 0)
console.log('1')
async function async1() {
  console.log('2')
  await async2()
  console.log('8')
}
async function async2() {
  return new Promise(function (resolve) {
    console.log('3')
    resolve()
  }).then(function () {
    console.log('6')
  })
}
async1()

new Promise(function (resolve) {
  console.log('4')
  resolve()
}).then(function () {
  console.log('7')
})
console.log('5')


// 1 2 3 4 5

/*
* 先输出1，2，3。3后面的then进入微任务队列。
执行外面的同步代码，输出4，5。4后面的then进入微任务队列。
接下来执行微任务，因为3后面的then先进入，所以按序输出6，7。
下面回到async1函数，await关键字等到了结果继续往下执行。
输出8，进行下一轮事件循环也就是宏任务二，输出9。
* */


//async function async1() {
//  console.log('2')
//  const data = await async2()
//  console.log(data)
//  console.log('8')
//}
//
//async function async2() {
//  return new Promise(function (resolve) {
//    console.log('3')
//    resolve('await的结果')
//  }).then(function (data) {
//    console.log('6')
//    return data
//  })
//}
//console.log('1')
//
//setTimeout(function () {
//  console.log('9')
//}, 0)
//
//async1()
//
//new Promise(function (resolve) {
//  console.log('4')
//  resolve()
//}).then(function () {
//  console.log('7')
//})
//console.log('5')


// 1 2 3 4 5 6 7 8 9



//setTimeout(function () {
//  console.log('8')
//}, 0)
//
//async function async1() {
//  console.log('1')
//  const data = await async2()
//  console.log('6')
//  return data
//}
//
//async function async2() {
//  return new Promise(resolve => {
//    console.log('2')
//    resolve('async2的结果')
//  }).then(data => {
//    console.log('4')
//    return data
//  })
//}
//
//async1().then(data => {
//  console.log('7')
//  console.log(data)
//})
//
//new Promise(function (resolve) {
//  console.log('3')
//  resolve()
//}).then(function () {
//  console.log('5')
//})




console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
.then(function() {
  console.log('promise1')
})
.then(function() {
  console.log('promise2')
})

console.log('script end')


// script start  async2 end   Promise  script end   promise1  async1 end   promise2 setTimeout
// script start => async2 end => Promise => script end => promise1 => promise2 => async1 end => setTimeout

/*
* 首先先来解释下上述代码的 async 和 await 的执行顺序。当我们调用 async1 函数时，会马上输出 async2 end，并且函数返回一个 Promise，
* 接下来在遇到 await的时候会就让出线程开始执行 async1 外的代码，所以我们完全可以把 await 看成是让出线程的标志。

然后当同步代码全部执行完毕以后，就会去执行所有的异步代码，那么又会回到 await 的位置执行返回的 Promise 的 resolve 函数，这又会把 resolve 丢到微任务队列中，
接下来去执行 then 中的回调，当两个 then 中的回调全部执行完毕以后，又会回到 await 的位置处理返回值，这时候你可以看成是 Promise.resolve(返回值).then()，
然后 await 后的代码全部被包裹进了 then 的回调中，所以 console.log('async1 end') 会优先执行于 setTimeout。
*
* */



let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a)
}
b()
a++
console.log('1', a)