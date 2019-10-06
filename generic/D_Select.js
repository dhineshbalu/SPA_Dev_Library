
export default class D_Select {
    constructor() {
        this.name = 'D_Select'
    }
    methods() {
        return {
            selectMethod()  {
                _.emit(this,'select',  {
                    value: this.data.selected
                })
            }
        }
    }
    data() {
        return {
           selected: ''
        }
    }
    beforeRender() {
        this.data.selected = this.props.value
    }
    render() {
       const self = this
      _.init(self)

    
     let selectBox =  select(
          {attr: {id: self.props.id,  dataBind: 'selected'}},
          {events: {change: self.selectMethod.bind(self)}}       
        )

        for (let i=0;i<self.props.options.length;i++) {
          _.append(selectBox, option(self.props.options[i].label,
                {attr: {value: self.props.options[i].value}}
            ))
        }
    let box = div({attr: {class: 'box', style: {
        top: self.props.top + '%',
        left: self.props.left + '%'
    }}})
    _.append(box,selectBox)
      _.append(self.element, box)
     
    }

}