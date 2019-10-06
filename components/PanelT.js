import D_Accordin from '../generic/D_Accordin.js'
import D_AccordinPanel from '../generic/D_AccordinPanel.js'

export default class PanelT {
    constructor() {
        this.name = 'PanelT'
    }
    components() {
        return [D_Accordin]
    }
    slotComponents() {
        return [D_AccordinPanel]
    }

    data() {
        return {
            selectedPanel: 'AccordinPanel_1'
        }
    }
    render() {
       const self = this
      _.init(self)

      _.append(self.element,_.custom(self,'Accordin_1',
        newComp('D_Accordin',
           {attr: {id: 'Accordin_1'}},
           {slots: {
               panel1: _.custom(self,'AccordinPanel_1',
                            newComp('D_AccordinPanel',
                            {attr: {id: 'AccordinPanel_1'}},
                            {slots: {
                                content: div('React (also known as React.js or ReactJS) is a JavaScript library[3] for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.[4][5][6] React can be used as a base in the development of single-page or mobile applications,')
                            }}
                            )
                        ),
                panel2: _.custom(self,'AccordinPanel_2',
                            newComp('D_AccordinPanel',
                                {attr: {id: 'AccordinPanel_2'}},
                                {slots: {
                                    content: div('panel 2 accordin panel')
                                }}
                            )
                        ),
                panel3: _.custom(self,'AccordinPanel_3',
                            newComp('D_AccordinPanel',
                                {attr: {id: 'AccordinPanel_3'}},
                                {slots: {
                                    content: div('React (also known as React.js or ReactJS) is a JavaScript library[3] for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.[4][5][6] React can be used as a base in the development of single-page or mobile applications,')
                                }}
                            )
                        )
           }}
        )
      ))

    }
}