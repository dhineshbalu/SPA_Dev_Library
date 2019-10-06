

export default class D_Tab {
    constructor() {
        this.name = 'D_Tab'
    }
    methods() {
        return {
            selectTabA(tabId) {
                this.data.selectedTab = tabId
            }
        }
    }
    data() {
        return {
           selectedTab: 'tabpane2',
           tabNames: []
        }
    }
    beforeRender() {
        let slotsArray = []
        for (let child in this.slots) {
            slotsArray.push(child)
        }
        this.data.tabNames = slotsArray 
    }
    render() {
     const self = this
    _.init(self)
    let links =  div({attr: {class: 'tab'}})
    for (let i=0;i<self.data.tabNames.length;i++) {
        _.append(links,
             button(self.data.tabNames[i],
             {attr: {class: self.data.selectedTab == self.data.tabNames[i] ? '': 'active'}},
             {events: {click: self.selectTabA.bind(self,self.data.tabNames[i])}}))
            }
    _.append(self.element,links)
     let SlotChild = self.slots
     for (let child in SlotChild) {
         if (self.data.selectedTab != child) {
             SlotChild[child].style.display = 'None'
            _.append(self.element,SlotChild[child])
         }  else  {
            SlotChild[child].style.display = 'Block'
            _.append(self.element,SlotChild[child])
        }
     }
    }
}