import buttont from './buttont.js'
import LoaderT from './LoaderT.js'
import SelectT from './SelectT.js'
import TabT from './TabT.js'
import ModalForm from './ModalFormT.js'
import InputT from './InputT.js'
import SwitchT from './SwitchT.js'
import PanelT from './PanelT.js'
import GridT from './GridT.js'
import CarosalT from './CarosalT.js'
import CheckBoxT from './CheckBoxT.js'
import RadioT from './RadioT'
import CheckBoxesT from './CheckBoxesT'

export default class LandingPage {
    constructor() {
        this.name = 'LandingPage'
    }
    components() {
        return [buttont,LoaderT,SelectT,TabT,ModalForm,InputT,SwitchT,PanelT,GridT,CarosalT,CheckBoxT,RadioT,CheckBoxesT]
    }
    created() {
        return {
         
        }
    }
    methods() {
        return {

        }
    }
    data() {
        return {
           active: 'CheckBoxesT'
        }
    }
    render() {
       const self = this
      _.init(self)
        // events.on('app:closeModalForm',(o)=> {
        //     if (o.closeModal) {
        //         self.data.active = ''
        //     }
        // })
        if (self.data.active != '')
      _.append(self.element,_.custom(self,self.data.active, newComp(self.data.active,{attr: {id: self.data.active}})))    
    }
    beforeUpdate() {
        events.off('app:closeModalForm')
    }
}