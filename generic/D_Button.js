
export default class D_ButtonT {
    constructor() {
        this.name = 'D_ButtonT'
    }
    methods() {
        return {
            onClicked() {
                _.emit(this,'select', this.props.id)
            }
        }
    }
    data() {
        return {
          
        }
    }
    render() {
       const self = this
      _.init(self)
     
      _.append(self.element, button(self.props.name, 
          {attr: {id: self.props.id, class: self.props.className}},
          {events: {click: self.onClicked.bind(self)}}
        ))  
    }
}