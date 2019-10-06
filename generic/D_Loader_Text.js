
export default class D_Loader_Text {
    constructor() {
        this.name = 'D_Loader_Text'
    }
    methods() {
        return {

        }
    }
    data() {
        return {
          active: false,
          text: ''
        }
    }
    render() {
       const self = this
      _.init(self)

     if (self.data.active) {
        _.append(self.element, div(self.data.text, 
          {attr: {class: 'loader'}}
        ))
     }

     events.on('showLoad_Text', (data) => {
         self.data.active = true
         self.data.text = data.text
     })
     
     events.on('offLoad_Text',() => {
         self.data.active = false
     })
     
    }

    beforeUpdate() {
        events.off('showLoad_Text')
        events.off('offLoad_Text')
    }
}