export default class D_CheckBox {
    constructor() {
        this.name = 'D_CheckBox'
    }
    methods() {
        return {
            selectedCheck(e) {
                _.emit(this,'change', {
                    value: this.data.selected
                })
            }
        }
    }
    data() {
        return {
            selected: false
        }
    }
    beforeRender() {
        this.data.selected = this.props.value
    }
    render() {
       const self = this
      _.init(self)

      _.append(self.element,input(
          {attr: {
              id: self.props.id + '_1', type: 'checkbox', dataBind: 'selected'
          }},
          {events: {click: self.selectedCheck.bind(self)}}
      ))
        
    }
}