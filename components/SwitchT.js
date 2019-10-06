import D_Switch from '../generic/D_Switch.js'
import D_ButtonT from '../generic/D_Button.js'

export default class SwitchT {
    constructor() {
        this.name = 'SwitchT'
    }
    components() {
        return [D_Switch,D_ButtonT]
    }
    created() {
        return {
         
        }
    }
    methods() {
        return {
            outputValue() {
                console.log(this.data.switchValue)
            },
            onClick() {
                events.emit('gc:switch', {
                    id: 'switch_1',
                    task: 'control|checked',
                    data:  false
                })
            }
        }
    }
    data() {
        return {
            switchValue: true
        }
    }
    render() {
       const self = this
      _.init(self)
     
    _.append(self.element,_.custom(self,'switch_1',
        newComp('D_Switch',
        {attr: {id: 'switch_1', id1: 'switch_1_1', on: 'val on..', off: 'val off..'}},
        {cusEvent: {input: self.outputValue.bind(self)}},
        {customBinding: {dataBind: 'switchValue'}}
    )))

    if(self.data.switchValue) {
        _.append(self.element,_.custom(self,'D_ButtonT_1', newComp('D_ButtonT', 
        {attr: {id: 'D_ButtonT_1', name: 'Off', className: 'button_1'}},
        {cusEvent: {select: self.onClick.bind(self)}}
      )))
    } 
    }
}