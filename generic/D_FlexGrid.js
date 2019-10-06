export default class D_FlexGrid {
    constructor() {
        this.name = 'D_FlexGrid'
    }
    methods() {
        return {
            getAllSots() {
                let slotData = div()
                for (let s in this.slots) {
                    _.append(slotData,this.slots[s])
                }
                return slotData
            }
        }
    }
    render() {
       const self = this
      _.init(self)

      _.append(self.element,div(
          {attr: {
              style: {
                display: 'Flex',
                maxHeight: '100%'  
              }
          }},
          self.getAllSots()
      ))
      
    }
}