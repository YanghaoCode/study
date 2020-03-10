class EventBus  {
  constructor() {
    this.callback= {}
  }
  $on(name, fn) {
      if (this.callback[name]) {
        this.callback[name].push(fn)
      } else {
        this.callback[name] = []
        this.callback[name].push(fn)
      }
  }
  $emit(name, data) {
    if (this.callback[name]) {
      this.callback[name].forEach(fn=>{
        fn.call(this, data)
      })
    }
  }
  $off(name) {
    if (this.callback[name]) {
      this.callback[name] = []
    }
  }
}

let eb = new EventBus()

eb.$emit('test', 123)

eb.$on('test', function(data) {
  console.log("data", data);
})


