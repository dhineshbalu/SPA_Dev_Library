export default class CheckBoxesT {
    constructor() {
        this.name = 'CheckBoxesT'
    }
    methods() {
        return {
            selectedCheckBox() {
                console.log(this.data.checkboxes)
            }
        }
    }
    data() {
        return {
            checkboxes: ['check_1']
        }
    }
    beforeRender() {
        
    }
    render() {
       const self = this
      _.init(self)
      
     _.append(self.element, div(
         input(
             {attr: {type: 'checkbox', dataBind: 'checkboxes', value: 'check_1' ,id:'field_1'}},
             {events: { click: self.selectedCheckBox.bind(self) }}
             ),
         input(
             {attr: {type: 'checkbox', dataBind: 'checkboxes', value: 'check_2', id: 'field_2'}},
             {events: { click: self.selectedCheckBox.bind(self) }}
             ),
         input(
             {attr: {type: 'checkbox', dataBind: 'checkboxes', value: 'check_3', id: 'field_3'}},
             {events: { click: self.selectedCheckBox.bind(self) }}
             ))
        )
    }
}