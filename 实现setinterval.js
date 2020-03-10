function mySetInterval(fn, millisec){
  function interval(){
    setTimeout(interval, millisec);
    fn();
  }
  setTimeout(interval, millisec)
}

const setInterval2 = (func, interval) => {
  const config = { shouldStop: false }
  const loop = () => {
    if (!config.shouldStop) {
      func();
      setTimeout(loop, interval);
    }
  }
  setTimeout(loop, interval);
  return config;
}

const myClearInterval = config => { config.shouldStop = true; }

mysetinterval(function() {
  console.log("2222")
},1000)