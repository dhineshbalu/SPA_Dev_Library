import D_Tab from '../generic/D_Tab.js'
import D_TabPane from '../generic/D_TabPane.js'
import D_ButtonT from '../generic/D_Button.js'

export default class TabT {
    constructor() {
        this.name = 'TabT'
    }
    components() {
        return [D_Tab]
    }
    slotComponents() {
        return [D_TabPane,D_ButtonT]
    }
    methods() {
        return {
            onClick1() {
              alert('Button_1 is selected')
            },
            onClick2() {
                alert('Button_2 is selected')
            },
            onClick3() {
                alert('Button_3 is selected')
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

    let tabpane1 = _.custom(self,'tabpane1',
                        newComp('D_TabPane',
                        {attr: {id: 'tabpane1', name: 'tabPane1', class: 'tabcontent'}},
                        {
                            slots: {
                                content: div(
                                    _.custom(self,'D_ButtonT_1', newComp('D_ButtonT', 
                                        {attr: {id: 'D_ButtonT_1', name: 'custom-ui-bt-1' , className: 'button_1'}},
                                        {cusEvent: {select: self.onClick1.bind(this)}}
                                    ))
                                 )
                            }
                        }
                        )
                    )
    let tabpane2 = _.custom(self,'tabpane2',
                        newComp('D_TabPane',
                        {attr: {id: 'tabpane2', name: 'tabpane2', class:'tabcontent'}},
                        {
                            slots: {
                                content:  _.custom(self,'D_ButtonT_2', newComp('D_ButtonT', 
                                            {attr: {id: 'D_ButtonT_2', name: 'custom-ui-bt-2' , className: 'button_2'}},
                                            {cusEvent: {select: self.onClick2.bind(this)}}
                                        ))
                            }
                        }
                        )
                    )
    let tabpane3 = _.custom(self,'tabpane3',
                        newComp('D_TabPane',
                        {attr: {id: 'tabpane3', name: 'tabpane3', class:'tabcontent'}},
                        {
                            slots: {
                                content:  _.custom(self,'D_ButtonT_3', newComp('D_ButtonT', 
                                            {attr: {id: 'D_ButtonT_3', name: 'custom-ui-bt-3' , className: 'button_3'}},
                                            {cusEvent: {select: self.onClick3.bind(this)}}
                                        ))
                                
                            }
                        }
                    ))

        let tab = _.custom(self, 'tab1',
                newComp('D_Tab',
                { attr: {id: 'tab1'}},
                {slots: {
                    tabpane1: tabpane1,
                    tabpane2: tabpane2,
                    tabpane3: tabpane3
                }}
                )
         )

    _.append(self.element,tab)

    }
}
