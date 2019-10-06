

export default class D_TabPane {
    constructor() {
        this.name = 'D_TabPane'
    }
    methods() {
        return {
            
        }
    }
    data() {
        return {
         
        }
    }
    render() {
     const self = this
    _.init(self)

    _.append(self.element,self['slots']['content'])
    }
}