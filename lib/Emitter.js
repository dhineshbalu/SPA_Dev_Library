function Emitter (obj) {
  if (obj) {
      obj.callbacks = {}
      obj.outputFunctions = {}
      obj.emit = (eventname,args) => {
          if (eventname) {
            obj.callbacks[eventname] = args
            obj.on(eventname)
          }
      }
     obj.on = (eventname,fn) => {
       if (typeof fn == 'function') {
        obj.outputFunctions[eventname] = fn
       }
       if (eventname && typeof fn == 'function') {
        if (typeof obj.callbacks[eventname] == 'object')
          fn(obj.callbacks[eventname])
       } else if (eventname && fn == undefined && typeof obj.outputFunctions[eventname] == 'function') {
        const funct = obj.outputFunctions[eventname]
          if (typeof obj.callbacks[eventname] == 'object')
            funct(obj.callbacks[eventname])
       }
    }
    obj.off = (eventname) => {
      if (eventname) {
       delete  obj.callbacks[eventname]
       delete  obj.outputFunctions[eventname]
      } else if (arguments.length == 0) {
         obj.callbacks = {}
      }
    }
    obj.once = (eventname,fn) => {
      if (eventname && typeof fn == 'function') {
        fn(obj.callbacks[eventname])
        obj.off(eventname)
      }
    }
   return obj
  }
}
export default Emitter