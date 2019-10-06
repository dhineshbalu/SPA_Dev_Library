
export default class D_FlexCol{
    constructor() {
        this.name = 'D_FlexCol'
    }
    render() {
       const self = this
      _.init(self)
  
      _.append(self.element,div(
         {attr: {style: {
            flex: self.props.span ? self.props.span  : '1',
            flexWrap: 'wrap',
            backgroundColor: self.props.bgColor ? self.props.bgColor : 'lightGrey',
            padding: '20px'
         }}},
         self.slots.content
      ))
      
    }
}