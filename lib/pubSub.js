export default class pubSub {
    constructor() {
        this.events = {}
    }
    subscribe(eventName,callback) {
        let self = this
        if (!self.events.hasOwnProperty(eventName)) {
           self.events[eventName] = []
        }
        self.events[eventName].push(callback)
    }
    publish(eventName,data = {}) {
        let self = this
        if (!self.events.hasOwnProperty(eventName)) {
            return []
        }
        self.events[eventName].map((callback) => callback(data))
    }
}