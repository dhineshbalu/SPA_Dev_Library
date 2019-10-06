
export default class D_CarosalItem {
    constructor() {
        this.name = 'D_CarosalItem'
    }
    render() {
       const self = this
      _.init(self)
      
      _.append(self.element,div(
          {attr: {id: self.props.id}},
          self.slots.content
      ))
    }
}