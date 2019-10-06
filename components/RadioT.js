export default class RadioT {
    constructor() {
        this.name = 'RadioT'
    }
    methods() {
        return {
            selectRadio() {
                console.log(this.data.selectedRadio)
            }
        }
    }
    data() {
        return {
            selectedRadio: 'radio1'
        }
    }
    beforeRender() {
        
    }
    render() {
       const self = this
      _.init(self)
      

      _.append(self.element,div(
       input(
          {attr: {type: 'radio', id: 'radio1', name: 'radio1' , value: 'radio1' , dataBind: 'selectedRadio'}},
          { events: { click: self.selectRadio.bind(self) }}
        ),
      input(
          {attr: {type: 'radio', id: 'radio2', name: 'radio2' , value: 'radio2', dataBind: 'selectedRadio'}},
          { events: { click: self.selectRadio.bind(self) }}
          ),
      input(
          {attr: {type: 'radio', name: 'radio3' , id: 'radio3', value: 'radio3', dataBind: 'selectedRadio'}},
          { events: { click: self.selectRadio.bind(self) }}
          )))
    }
}