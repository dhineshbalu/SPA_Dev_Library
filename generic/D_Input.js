export default class D_Input {
    constructor() {
        this.name = 'D_Input'
    }
    methods() {
        return {
            userInput(e) {
               _.emit(this,'input', {
                   value: e.target.value
               })
            }
        }
    }
    data() {
        return {
            value: ''
        }
    }
    beforeRender() {
        this.data.value = this.props.value
    }
    render() {
       const self = this
      _.init(self)

      _.append(self.element,input(
          {attr: {id: self.props.id + '_1', value: self.data.value, dataBind: 'value', style: {width: self.props.width + 'px'}, class: 'input', type: self.props.type}},
          {events: {change: self.userInput.bind(self)}}
      ))
        
    }
}