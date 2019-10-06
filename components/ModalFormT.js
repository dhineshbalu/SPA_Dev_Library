import D_ModalForm from '../generic/D_ModalForm.js'
import D_Button from '../generic/D_Button.js'

export default class ModalFormT {
    constructor() {
        this.name = 'ModalFormT'
    }
    components() {
        return [D_ModalForm]
    }
    slotComponents() {
        return [D_Button]
    }
    methods() {
        return {
            onClick1() {
                this.data.count++
            },
            success() {
                 
            },
            cancel() {
                events.emit('closeModalForm', {
                    closeModal : true
                })
            }
        }
    }
    data() {
        return {
           count: 0
        }
    }
    render() {
        events.on('closeModalForm', (o)=> {
            events.emit('app:closeModalForm', {
                closeModal: true
            })
        })

        const self = this
        _.init(self)
      let modalForm = _.custom(self,'modaForm1',
                        newComp('D_ModalForm',
                           {attr: {id: 'modaForm1'}},
                           {
                               slots: {
                                   head: h2('Title'),
                                   body: div(
                                        _.custom(self,'D_ButtonT_1', newComp('D_ButtonT', 
                                        {attr: {id: 'D_ButtonT_1', name:'count - ' +  self.data.count , className: 'button_1'}},
                                        {cusEvent: {select: self.onClick1.bind(this)}}
                                        ))
                                   ),
                                   footer: div(
                                        _.custom(self,'cancel', newComp('D_ButtonT', 
                                            {attr: {id: 'cancel', name: 'cancel' , className: 'button_3', style: {
                                                float: 'right'
                                            }}},
                                            {cusEvent: {select: self.cancel.bind(this)}}
                                        )),
                                        _.custom(self,'success', newComp('D_ButtonT', 
                                            {attr: {id: 'success', name: 'success' , className: 'button_4', style: {
                                                float: 'right'
                                            }}},
                                            {cusEvent: {select: self.success.bind(this)}}
                                        ))
                                   )
                               }
                           }
                        )
                     )
       _.append(self.element,modalForm)
    }
    beforeUpdate() {
        events.off('closeModalForm')
    }
}