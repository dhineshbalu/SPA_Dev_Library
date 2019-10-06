import D_Input from '../generic/D_Input.js'

export default class InputT {
    constructor() {
        this.name = 'InputT'
    }
    components() {
        return [D_Input]
    }
    created() {
        return {
         
        }
    }
    methods() {
        return {
            validateName() {
                console.log(this.data.username)
            }
        }
    }
    data() {
        return {
           username: 'dhina'
        }
    }
    render() {
       const self = this
      _.init(self)

      _.append(self.element, _.custom(self,'input_1',
          newComp('D_Input',
           {attr: {id: 'input_1', type: 'text', width: '300', dataBind: 'username'}},
           {cusEvent: {input: self.validateName.bind(self)}},
           {customBinding:{dataBind: 'username'}}
          )
        ))
        
    }
}