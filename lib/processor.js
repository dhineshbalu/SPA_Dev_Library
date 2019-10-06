
const processor = {
    append(parent,child) {
        parent.appendChild(child)
    },
    init(self) {
        self.element.innerHTML = ""
    },
    emit(self,property, data = {}) {
        if (self && self.parent && self.parent['customBinding'] && self.parent['customBinding'][self.id][self.tagName]) {
            let bind = self.parent['customBinding'][self.id][self.tagName]['dataBind']
            if (bind && self['parent']['data']) {
                self['parent']['data'][bind] = data.value
            }
        }
        if (self.emit && self.emit[property])
          self.emit[property](data)
    },
    custom(self,id,cust) {
        let idFound = false
        let selectedComp = null
        if (self.childrens != 'undefined' && self.childrens && self.childrens.length > 0 ) {
            for (let children of self.childrens) {
                if (children.id == id) {
                   idFound = true
                   selectedComp = children   
                }
            }
        }
        if (self.childrens != 'undefined' && cust && self.childrens && self.childrens.length > 0 && idFound 
        && (this.isEqual(self.childPropsData[id][cust.element.tagName],cust['propsData'][cust.element.tagName])) && (self.slotsData[id] && self.slotsData[id][cust.element.tagName] &&  this.isEqual(self.slotsData[id][cust.element.tagName],cust['slotsData'][cust.element.tagName]))
        ) {
            selectedComp.reload = false
            return selectedComp.element
        }

        if (typeof self.childPropsData[id] == 'undefined') {
            self.childPropsData[id] = cust.propsData
        } else {
           self.childPropsData[id] = cust.propsData
        }

        if (typeof self.slotsData[id] == 'undefined') {
            self.slotsData[id] = cust.slotsData
        } else {
           self.slotsData[id] = cust.slotsData
        }

        if (typeof self.customEvents[id] == 'undefined') {
            self.customEvents[id] = cust.customEvents
        } else {
            self.customEvents[id] = cust.customEvents
        }

        if (typeof self.customBinding[id] == 'undefined') {
            self.customBinding[id] = cust.customBinding
        } else {
            self.customBinding[id] = cust.customBinding
        }
        
        if (selectedComp)
        selectedComp.reload = true
        
        return cust.element
    },
    route(routePath) {
        routePath = new Proxy(routePath, {
            set: function(obj,key,val) {
                obj[key] = val
                let route = document.querySelector('router-view')
                let comps = null
                let routers = obj['routers']
                for (let i=0;i<routers.length;i++) {
                    if (routers[i].path.split('/').length == val.split("/").length) {
                        let wl = routers[i].path.split("/")
                        let ol = val.split("/")
                        let flag = true 
                      for (let k=0;k<wl.length;k++) {
                         if (wl[k] == ol[k] && wl[k][0] != ':') {
                             continue
                         } else if (wl[k][0] == ':' && ol[k]) {
                             continue
                         } else {
                             flag = false
                             break
                         }
                      }
                      if (flag) {
                          comps = routers[i].component
                          break
                      }
                    }
                }

                location.hash  = val
                if (comps) {
                    let selectedComp = new comps()
                    selectedComp.element = route
                    createComponent(selectedComp,null)
                }
                return true
            } 
          })
        return routePath
    },
    setTheComponent(app,parent = null) {
        createComponent(app,parent)
    },
    isEqual(a,b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
    
        if (aProps.length != bProps.length) {
            return false;
        }
    
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
    
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
    
        return true;
      }
}


export default processor

window._ = processor


