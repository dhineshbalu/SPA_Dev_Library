


export default class D_Accordin {
    constructor() {
        this.name = 'D_Accordin'
    }
    methods() {
        return {
            returnSlots() {
                let slotData = div()
                for (let s in this.slots) {
                    _.append(slotData,this['slots'][s])
                }
                return slotData
            }
        }
    }
    render() {
       const self = this
      _.init(self)

      _.append(self.element, div(
          {attr: {class: 'panel'}},
          self.returnSlots()
      ))
      
    }
}