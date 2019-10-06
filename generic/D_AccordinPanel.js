

export default class D_AccordinPanel {
    constructor() {
        this.name = 'D_AccordinPanel'
    }
    methods() {
        return {
            selectPanel(id) {  
               this.parent.data.selectedPanel = id
            },
            desideBlock(id) {
                return this.parent.data.selectedPanel == id ? true : false
            }
        }
    }
    data() {
        return {
            visible: false
        }
    }
    render() {
       const self = this
      _.init(self)
      _.append(self.element,h5(self.props.id,
          {attr: {class: 'headClass'}},
          {events: {click: self.selectPanel.bind(self,self.props.id)}},
          div(
              {attr: {class: 'bodyClass', style: {display: self.desideBlock(self.props.id) ? 'inline-block': 'none'}}},
              self.slots.content
          )
      ))
    }
}