
export default class D_Loader {
    constructor() {
        this.name = 'D_Loader'
    }
    methods() {
        return {

        }
    }
    data() {
        return {
          active: false
        }
    }
    render() {
       const self = this
      _.init(self)

     if (self.data.active) {
        _.append(self.element, div('Loading', 
          {attr: {class: 'loading'}}
        ))
     }

     events.on('showLoad', (data) => {
         self.data.active = data.show
     })   
     
     events.on('offLoad', (data) => {
        self.data.active = data.show
    })   
     
    }

    beforeUpdate() {
        events.off('showLoad')
        events.off('offLoad')
    }
}