import D_Select from '../generic/D_Select.js'
export default class SelectT {
    constructor() {
        this.name = 'SelectT'
    }
    components() {
        return [D_Select]
    }
    methods() {
        return {
            selected1(data) {
                console.log('select_1')
                console.log(this.data.selectedValue1)
            } ,
            selected2(data) {
                console.log('select_2')
                console.log(this.data.selectedValue2)
            }  
        } 
    }
    data() {
        return {
           selectedValue1: 'value_1',
           selectedValue2: 'value_5',
            options: []
        }
    }
    beforeRender() {
        let opt = []
        for (let i=1;i<=10;i++) {
            opt.push({
                value: 'value_' + i,
                label: 'label_' + i
            })
        }
        this.data.options = opt
    }
    render() {
       const self = this
      _.init(self)
      
      _.append(self.element,_.custom(self,'D_Select_1',
        newComp('D_Select', 
          {attr: {id: 'D_Select_1', options: self.data.options, top: 30, left: 10}},
          {customBinding: {dataBind: 'selectedValue1'}},
          {cusEvent: {select: self.selected1.bind(self)}}
        )
      ))

      _.append(self.element,_.custom(self,'D_Select_2',
        newComp('D_Select', 
          {attr: {id: 'D_Select_2', options: self.data.options, top: 30, left: 30}},
          {customBinding: {dataBind: 'selectedValue2'}},
          {cusEvent: {select: self.selected2.bind(self)}}
        )
      ))

     
    }

}