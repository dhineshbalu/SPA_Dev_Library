import { O_APPEND } from "constants"

export default class D_Carosal {
    constructor() {
        this.name = 'D_Carosal'
    }
    methods() {
        return {
            getAllButton() {
                let btn = div()
                for (let b in this.slots) {
                  _.append(btn,div('',
                    {attr: {
                        class: this.classCarosal(b),
                        style: {
                            cursor: 'pointer',
                            display: 'inline-block',
                            fontWeight: 'bold'
                        }
                    }},
                    {events: {click: this.selectCarosal.bind(this,b)}}
                    ))
                }
                return btn
            },
            classCarosal(id) {
               return this.parent.data.selectedCarosal == id ? 'active' : 'notactive'
            },
            selectCarosal(id) {
               this.parent.data.selectedCarosal = id
            },
            getPartSlots() {
                let sl = div()
                for (let s in this.slots) {
                  if (this.parent.data.selectedCarosal == s) {
                     this.slots[s].style.display = 'Block'
                  } else {
                     this.slots[s].style.display = 'None'
                  }
                  _.append(sl,this.slots[s])
                }
                return sl
            }
        }
    }
    render() {
       const self = this
      _.init(self)
      _.append(self.element,div(
          {attr: {class: 'carosal'}},
          self.getPartSlots()
      ))

      _.append(self.element,div(
          {attr: {
              style: {
                textAlign: 'center',
                backgroundColor: 'blueviolet',
                margin: 'auto',
                maxWidth: '1000px'
              }
          }},
          self.getAllButton()
      ))
    }
}