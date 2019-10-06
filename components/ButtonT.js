import D_ButtonT from '../generic/D_Button.js'

export default class buttont {
    constructor() {
        this.name = 'buttont'
    }
    components() {
        return [D_ButtonT]
    }
    methods() {
        return {
            onClick(name) {
               console.log('Button ' + name + ' is clicked')
            }
        }
    }
    render() {
       const self = this
      _.init(self)

      _.append(self.element,_.custom(self,'D_ButtonT_1', newComp('D_ButtonT', 
        {attr: {id: 'D_ButtonT_1', name: 'custom-ui-bt-1', className: 'button_1'}},
        {cusEvent: {select: self.onClick}}
      )))

      _.append(self.element,br())
      _.append(self.element,br())

      _.append(self.element,_.custom(self,'D_ButtonT_2', newComp('D_ButtonT', 
        {attr: {id: 'D_ButtonT_2', name: 'custom-ui-bt-2', className: 'button_2'}},
        {cusEvent: {select: self.onClick}}
      )))

      _.append(self.element,br())
      _.append(self.element,br())

      _.append(self.element,_.custom(self,'D_ButtonT_3', newComp('D_ButtonT', 
        {attr: {id: 'D_ButtonT_3', name: 'custom-ui-bt-3', className: 'button_3'}},
        {cusEvent: {select: self.onClick}}
      )))

      _.append(self.element,br())
      _.append(self.element,br())

      _.append(self.element,_.custom(self,'D_ButtonT_4', newComp('D_ButtonT', 
        {attr: {id: 'D_ButtonT_4', name: 'custom-ui-bt-4', className: 'button_4'}},
        {cusEvent: {select: self.onClick}}
      )))

      _.append(self.element,br())
      _.append(self.element,br())

      _.append(self.element,_.custom(self,'D_ButtonT_5', newComp('D_ButtonT', 
        {attr: {id: 'D_ButtonT_5', name: 'custom-ui-bt-5', className: 'button_5'}},
        {cusEvent: {select: self.onClick}}
      )))
    }
}