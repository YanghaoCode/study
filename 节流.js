
window.addEventListener('scroll', jieliu(function() {
  console.log("2222")
},1000))


function jieliu(fn, wait=50) {
  let lastTime = 0;
  return function() {
    let now = new Date().getTime();
    if (now - lastTime > wait) {
      fn.apply(this, [...arguments])
      lastTime = now
    }
  }
}

window.addEventListener('scroll', fangdou(function() {
  console.log("33333")
}, 100))

function fangdou(fn, time = 50) {
  let timer = null;
  return function() {
    if (timer) clearTimeout(timer);

    timer = setTimeout(function() {
      fn.apply(this, [...arguments])
    },time)
  }
}