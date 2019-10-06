import D_FlexCol  from '../generic/D_FlexCol.js'
import D_FlexGrid from '../generic/D_FlexGrid.js'
export default class GridT {
    constructor() {
        this.name = 'GridT'
    }
    components() {
        return [D_FlexGrid]
    }
    slotComponents() {
        return [D_FlexCol]
    }
    render() {
       const self = this
      _.init(self)
      _.append(self.element,div(
          _.custom(self,'grid_1',
            newComp('D_FlexGrid',
              {attr: {id: 'grid_1'}},
              {
                  slots: {
                        col1: _.custom(self,'grid_col_1',
                                newComp('D_FlexCol',
                                    {attr: {id: 'grid_col_1', span: 2}},
                                    {
                                        slots: {
                                            content: div('Vue was created by Evan You after working for Google using AngularJS in a number of projects. He later summed up his thought process: "I figured, what if I could just extract the part that I really liked about Angular and build something really lightweight."[6] The first source code commit to the project was dated July 2013, and Vue was first released the following February, in 2014.')
                                        }
                                    }
                                )
                            ),
                        col2: _.custom(self,'grid_col_2',
                            newComp('D_FlexCol',
                                {attr: {id: 'grid_col_2', span: 3}},
                                {
                                    slots: {
                                        content: div('Vue was created by Evan You after working for Google using AngularJS in a number of projects. He later summed up his thought process: "I figured, what if I could just extract the part that I really liked about Angular and build something really lightweight."[6] The first source code commit to the project was dated July 2013, and Vue was first released the following February, in 2014.')
                                    }
                                }
                            )
                        ),
                        col3: _.custom(self,'grid_col_3',
                        newComp('D_FlexCol',
                            {attr: {id: 'grid_col_3', bgColor:"green"}},
                            {
                                slots: {
                                    content: div('Vue was created by Evan You after working for Google using AngularJS in a number of projects. He later summed up his thought process: "I figured, what if I could just extract the part that I really liked about Angular and build something really lightweight."[6] The first source code commit to the project was dated July 2013, and Vue was first released the following February, in 2014.')
                                }
                            }
                        )
                    )
                  }
              }
            )
          )
      ))
      
    }
}