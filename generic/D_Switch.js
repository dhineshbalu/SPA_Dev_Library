
export default class D_Switch {
    constructor() {
        this.name = 'D_Switch'
    }
    methods() {
        return {
            changeToggle(event) {
                if (event.target.checked) {
                    this.data.val = this.props.on
                 } else {
                   this.data.val = this.props.off
                 }
                 
                 _.emit(this,'input',{
                     value: this.data.selectedCheckBox
                 })
            },
            sliderText() {
                return strong(this.data.val,{attr: {class: 'text'}})
            },
            controls(task,val) {
                switch(task) {
                  case 'checked':
                        this.data.val = val
                        this.data.selectedCheckBox = val
                          break
                }
                _.emit(this,'input',{
                    value: val
                })
               
            }
        }
    }
    data() {
        return {
            val: '',
            selectedCheckBox: false
        }
    }
    beforeRender() {
        if (this.props.value) {
            this.data.val = this.props.on
        } else {
            this.data.val = this.props.off
        }
        this.data.selectedCheckBox = this.props.value

        events.on('gc:switch',(o) => {
            let str = o.task.split('|')
             if (this.props.id == o.id) {
                if (str[0] == 'control') {
                    this.controls(str[1],o.data)
                 }
             }
          })
    }
    render() {
       const self = this
      _.init(self)
    _.append(self.element,label(
        {attr: {class: 'switch'}},
        input(
            {attr: {id: self.props.id1, type: 'checkbox', dataBind: 'selectedCheckBox'}},
            {events: {click: self.changeToggle.bind(self)}}
        ),
        span(
            {attr: {class: 'slider round'}}
        ),
        span(
            self.sliderText()
        )
    ))    
    }
   
   
}