//https://juejin.im/post/5dc4eae1e51d456e3562751a#heading-1
/*
* 在 Chrome 中除了正常使用的消息队列之外，还有另外一个消息队列(我们可以称为延迟队列)，这个队列中维护了需要延迟执行的任务列表，包括了定时器和 Chromium 内部一些需要延迟执行的任务。所以当通过 JavaScript 创建一个定时器时，渲染进程会将该定时器的回调任务添加到延迟队列中。
*/

//1、如果当前任务执行时间过久，会影延迟到期定时器任务的执行
let startTime = Date.now()

function bar() {
  console.log('bar')
  const endTime = Date.now()
  console.log('cost time',endTime - startTime)
}
function foo() {
  setTimeout(bar, 0);
  for (let i = 0; i < 5000; i++) {
    let i = 5+8+8+8
    console.log(i)
  }
}
foo()


//2、使用 setTimeout 设置的回调函数中的 this 环境不是指向回调函数 比如这段代码：
var name= 1;
var MyObj = {
  name: 2,
  test:1,
  showName: function(){
    console.log(this.name,this.test);
  }
}
setTimeout(MyObj.showName,1000)
MyObj.showName()


//如果 setTimeout 存在嵌套调用，调用超过5次后，系统会设置最短执行时间间隔为 4 毫秒。 我们可以在浏览器粗略测试一下，有如下代码：
let startTime1 = Date.now()
function cb() {
  const endTime = Date.now()
  console.log('cost time',endTime - start1Time)
  startTime1 = startTime
  setTimeout(cb, 0);
}
setTimeout(cb, 0);

