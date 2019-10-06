export default class D_ModalForm {
    constructor() {
        this.name = 'D_ModalForm'
    }
    methods() {
        return {
            DontShow() {
                events.emit('closeModalForm', {
                    closeModal: true
                })
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
     let modalForm = div(
         {attr: {class: 'modalContainer'}},
         div(
             {attr: {class: 'modalContent'}},
             span(
                 'X',
                 {attr: {class: 'close'}},
                 {events: {click: self.DontShow.bind(this)}}
             ),
             div(
                 {attr: {class: 'modalHead'}},
                 self['slots']['head']
             ),
             div(
                 {attr: {class: 'modalBody'}},
                 self['slots']['body']
             ),
             div(
                 {attr: {class: 'modalFooter'}},
                 self['slots']['footer']
             )
         )
     )
     _.append(self.element,modalForm)
    }
}