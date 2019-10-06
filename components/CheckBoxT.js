import D_CheckBox from '../generic/D_CheckBox.js'
export default class CheckBoxT {
    constructor() {
        this.name = 'CheckBoxT'
    }
    components() {
        return [D_CheckBox]
    }
    methods() {
        return {
            selectedCheckBox() {
                console.log('selected checkbox ' + this.data.checkedValue)
            }
        }
    }
    data() {
        return {
           checkedValue: true
        }
    }
    beforeRender() {
        
    }
    render() {
       const self = this
      _.init(self)
      
      _.append(self.element, _.custom(self,'checkBox_1',
        newComp('D_CheckBox', 
          {attr: {  id: 'checkBox_1' }},
          { customBinding: {  dataBind: 'checkedValue' } },
          {cusEvent: {change: self.selectedCheckBox.bind(self)}},
        )
      ))
    }
}