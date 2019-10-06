import D_Carosal from '../generic/D_Carosal.js'
import D_CarosalItem from '../generic/D_CarosalItem.js'
export default class CarosalT {
    constructor() {
        this.name = 'CarosalT'
    }
    components() {
        return [D_Carosal]
    }
    slotComponents() {
        return [D_CarosalItem]
    }
    data() {
        return {
           selectedCarosal: 'carItem_3'
        }
    }
    render() {
       const self = this
      _.init(self)
      _.append(self.element,div(
        _.custom(self,'carosal_1',
          newComp('D_Carosal',
            {attr: {id: 'carosal_1'}},
            {
                slots: {
                    carItem_1: _.custom(self,'carItem_1',
                              newComp('D_CarosalItem',
                                  {attr: {id: 'carItem_1'}},
                                  {
                                      slots: {
                                          content: div('carosal content 1 for testing purpose')
                                      }
                                  }
                              )
                          ),
                     carItem_2: _.custom(self,'carItem_2',
                          newComp('D_CarosalItem',
                              {attr: {id: 'carItem_2',}},
                              {
                                  slots: {
                                      content: div('carosal content 2 for testing purpose')
                                  }
                              }
                          )
                      ),
                      carItem_3: _.custom(self,'carItem_3',
                      newComp('D_CarosalItem',
                          {attr: {id: 'carItem_3'}},
                          {
                              slots: {
                                  content: div('carosal content 3 for testing purpose')
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