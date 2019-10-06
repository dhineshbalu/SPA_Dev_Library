import createComponent from './createComponent.js'

export default function updateComponent(self) {
    let componentsName = self.componentsName
    let components  = self.components 
    let i = 0
    // to set two way binding
    self.scope = {}
    TwoWayDataBinding(self)
    for (let componentName of componentsName) {
        let component = components[i]
        if (self.element.querySelectorAll(componentName).length > 0) {
            for(let qry of self.element.querySelectorAll(componentName)) {
                let selectedComponent = null
                for (let children of self.childrens) {
                    if (children.id == qry.getAttribute('id')) {
                     selectedComponent = children
                    break
                    }
                }
                if (selectedComponent && selectedComponent.reload) {
                    selectedComponent.reload = false

                    let id = qry.getAttribute('id')
                    let tagName = qry.tagName
                    
                    if (id && tagName && self.childPropsData[id][tagName]) {
                      dynamicProps(selectedComponent,self.childPropsData[id][tagName])
                    }

                    if (id && tagName && self.slotsData[id][tagName]) {
                      dynamicSlots(self,selectedComponent,self.slotsData[id][tagName],self)
                    }

                    if (id && tagName && self.customEvents[id][tagName]) {
                      dynamicEvents(selectedComponent,self.customEvents[id][tagName])
                    }

                    if (id && tagName && self.customBinding[id][tagName]) {
                      let bind = self.customBinding[id][tagName]['dataBind']
                      selectedComponent['props']['value'] = self['data'][bind]
                    }
                    selectedComponent.render()
                    qry.replaceWith(selectedComponent.element)
                    updateComponent(selectedComponent)
                    
                    // qry.appendChild(selectedComponent.element)
                    // qry.innerHTML = ""
                    // qry.appendChild(selectedComponent.element)

                   
                } else if (selectedComponent == null && qry && component) {
                    // to add the child object if it is in the DOM
                    let cmp = new component() 
                    // let id = qry.getAttribute('id') ? qry.getAttribute('id') : ''
                    // cmp.id = id
                    let id = qry.getAttribute('id')
                    cmp.id = id
                    let tagName = qry.tagName
                    if (id && tagName && self.childPropsData[id][tagName]) {
                      dynamicProps(cmp,self.childPropsData[id][tagName])
                    //   self.childPropsData = {}
                    }
                    if (id && tagName && self.slotsData[id][tagName]) {
                        dynamicSlots(self,cmp,self.slotsData[id][tagName])
                    }
                    if (id && tagName && self.customEvents[id][tagName]) {
                      dynamicEvents(cmp,self.customEvents[id][tagName])
                    //   self.childPropsData = {}
                    }

                    if (id && tagName && self.customBinding[id][tagName]) {
                      let bind = self.customBinding[id][tagName]['dataBind']
                      cmp['props']['value'] = self['data'][bind]
                    }
                    // updateProps(cmp,qry)
                    self.childrens.push(cmp)
                    cmp.element = qry
                    createComponent(cmp)
                }
            }
        } else {
           // to remove the child object if it not in the DOM
            for (let index in  self.childrens) {
                if (self.childrens[index].name == componentName) {
                    self.childrens.splice(index,1)
                }
            }
            for (let index in  self.childrens) {
                if (self.childrens[index].name == componentName) {
                    self.childrens.splice(index,1)
                }
            }
        }
       i++
    }
  }
function dynamicProps(self,props) {
    self['props'] = {}
    for (let properties in props) {
      self['props'][properties] = props[properties]
    }
}
function dynamicSlots(parent,self,slots) {
    self['slots'] = {}
    for (let element in slots) {
      if (parent.slotsChildrens.length) {
        if(updateSlotsComponents(parent,self,slots[element],element)) {
          self['slots'][element] = slots[element]
        }
      } else {
        self['slots'][element] = slots[element]
      }
    }
}
function updateSlotsComponents(parent,child,element,attr,appendSlot) {
  let slotContent = div()
  _.append(slotContent,element)

  let flag = true
    let slotCompNames = parent.slotsComponentsName
    for (let slotCompName of slotCompNames) {
      if (slotContent.querySelectorAll(slotCompName).length > 0) {
        for(let qry of slotContent.querySelectorAll(slotCompName)) {
          let selectedComponent = null
            for (let children of parent.slotsChildrens) {
              if (children.id == qry.getAttribute('id')) {
              flag = false
              selectedComponent = children
              break
              }
            }
            if (selectedComponent) {
              let id = qry.getAttribute('id')
              let tagName = qry.tagName
              
                          
              if (id && tagName && parent.childPropsData[id][tagName]) {
                dynamicProps(selectedComponent,parent.childPropsData[id][tagName])
              }


              if (id && tagName && parent.slotsData[id][tagName]) {
                dynamicSlots(parent,selectedComponent,parent.slotsData[id][tagName],false)
              }

              if (id && tagName && parent.customEvents[id][tagName]) {
                dynamicEvents(selectedComponent,parent.customEvents[id][tagName])
              }

              if (id && tagName && parent.customBinding[id][tagName]) {
                let bind = parent.customBinding[id][tagName]['dataBind']
                selectedComponent['props']['value'] = parent['data'][bind]
              }

              selectedComponent.render()
              TwoWayDataBinding(selectedComponent)
              qry.replaceWith(selectedComponent.element)
              
          }
        }
      }
    }
    if (!flag) {
       child['slots'][attr] = slotContent.children[0]
    }
    return flag 
}
function dynamicEvents(self,cusEvents) {
  self['emit'] = {}
  for (let properties in cusEvents) {
    self['emit'][properties] = cusEvents[properties]
  }
}
function moveCursorToEnd(el) {
  if (typeof el.selectionStart == "number") {
      el.selectionStart = el.selectionEnd = el.value.length;
  } else if (typeof el.createTextRange != "undefined") {
      el.focus();
      var range = el.createTextRange();
      range.collapse(false);
      range.select();
  }
}
function TwoWayDataBinding(self) {
let elements = self.element.querySelectorAll('[dataBind]')
elements.forEach((element) => {
if (element.type == 'text' || element.type == 'textarea') {
    let propToBind = element.getAttribute('dataBind')
    let _ = propToBind.split('.')
    let key = _[_.length-1]
    let obj =  processDataLength(_,self,key)
    addScopeProp(self,propToBind)
    element.oninput = function() {
    self.checkData = 1
    self.scope[propToBind] = element.value 
    obj[key] = element.value
    let id = element.getAttribute('id')
    document.getElementById(id).focus()
    moveCursorToEnd(document.getElementById(id))
    }
} else if (element.tagName == 'SELECT') {
  let propToBind = element.getAttribute('dataBind')
  let _ = propToBind.split('.')
  let key = _[_.length-1]
  let obj =  processDataLength(_,self,key)
  addScopeProp(self,propToBind)
  if (typeof obj[key] == 'string') {
    for (let i=0;i<element.options.length;i++) {
      if (element.options[i].value ==  obj[key]) {
        element.options[i].selected = true
        break
      }
    }
    element.onchange = function() {
      self.checkData = 1
      self.scope[propToBind] = element.value 
      obj[key] = element.value 
      
    }
  } else if (typeof obj[key] == 'object') {
    for (let i=0;i<element.options.length && obj[key].length > 0;i++) {
      if (obj[key].includes(element.options[i].value)) {
        element.options[i].selected = true
      }
    }
    element.onchange = function() {
      self.checkData = 1
      let newSelect = []
      for (let i=0;i<element.options.length;i++) {
          if (element.options[i].selected)
           newSelect.push(element.options[i].value)
      }
      obj[key] = newSelect
    }
  }
}  else if (element.type == 'checkbox') {
  let propToBind = element.getAttribute('dataBind')
  let _ = propToBind.split('.')
  let key = _[_.length-1]
  let obj =  processDataLength(_,self,key)
  addScopeProp(self,propToBind)
  if (typeof obj[key] == 'boolean') {
    if (!obj[key]) {
      element.removeAttribute('checked')
     } 
     if (obj[key]) {
       let att = document.createAttribute("checked")
       att.value = true                           
       element.setAttributeNode(att)
     }
     element.onclick = function() {
       self.checkData = 1
      //  self.scope[propToBind] = obj[key]
       obj[key] = element.checked ? true : false 
       if (!element.checked) {
        obj[key] = element.checked
         element.removeAttribute('checked')
       } else {
         obj[key] = element.checked
       }
     }
  } else if(typeof obj[key] == 'object') {
     if (obj[key].includes(element.value)) {
       let att = document.createAttribute("checked")
       att.value = true                           
       element.setAttributeNode(att)
     } else {
      element.removeAttribute('checked')
     }
     element.onclick = function() {
      // self.scope[propToBind] = element.checked ? true : false 
      if (!element.checked) {
        let newBox = []
        for (let i=0;i<obj[key].length;i++) {
          if (obj[key][i] != element.value) 
           newBox.push(obj[key][i])
        }
        obj[key] = newBox
      }
      if (element.checked) {
        let box = obj[key]
        box.push(element.value)
        obj[key] = box
      }
     }
  }
}  else if (element.type == 'radio') {
  let propToBind = element.getAttribute('dataBind')
  let _ = propToBind.split('.')
  let key = _[_.length-1]
  let obj =  processDataLength(_,self,key)
  addScopeProp(self,propToBind)
  let radioButtons = document.getElementsByName(element.getAttribute('name') ? element.getAttribute('name') : '');
  for (let i=0;i<radioButtons.length;i++) {
     if (getCorrectRadio(radioButtons[i].attributes, propToBind)) {
       if (obj[key] == radioButtons[i].getAttribute('value'))
        radioButtons[i].checked = true
      else
       radioButtons[i].checked = false
     } 
  }
  element.onclick = function() {
    let radioButtons = document.getElementsByName(element.getAttribute('name') ? element.getAttribute('name') : '');
    for (let i=0;i<radioButtons.length;i++) {
      if (getCorrectRadio(radioButtons[i].attributes, propToBind)) {
          if (element.value == radioButtons[i].getAttribute('value'))
          radioButtons[i].checked = true
        else
        radioButtons[i].checked = false
      }
    }
    self.scope[propToBind] = element.value
    obj[key] = element.value
  }
} else if (!element.type) {
    let propToBind = element.getAttribute('dataBind')
    let _ = propToBind.split('.')
    let key = _[_.length-1]
    let obj =  processDataLength(_,self,key)
    element.innerHTML = obj[key]
}
})
}
function processDataLength(_,self) {
    let obj = null
    if (_.length == 1) {
      obj =  self['data']
      } else if (_.length == 2) {
      obj =  self['data'][_[0]]
      } else if (_.length == 3) {
      obj =  self['data'][_[0]][_[1]]
      }  else if (_.length == 4) {
      obj =  self['data'][_[0]][_[1]][_[2]]
      }  else if (_.length == 5) {
      obj =  self['data'][_[0]][_[1]][_[2]][_[3]]
      }   else if (_.length == 6) {
      obj =  self['data'][_[0]][_[1]][_[2]][_[3]][_[4]]
      }  else if (_.length == 7) {
        obj =  self['data'][_[0]][_[1]][_[2]][_[3]][_[4]][_[5]]
      }  else if (_.length == 8) {
        obj =  self['data'][_[0]][_[1]][_[2]][_[3]][_[4]][_[5]][_[6]]
      }  else if (_.length == 9) {
        obj =  self['data'][_[0]][_[1]][_[2]][_[3]][_[4]][_[5]][_[6]][_[7]]
      }  else if (_.length == 10) {
        obj =  self['data'][_[0]][_[1]][_[2]][_[3]][_[4]][_[5]][_[6]][_[7]][_[8]]
      }  else if (_.length == 11) {
        obj =  self['data'][_[0]][_[1]][_[2]][_[3]][_[4]][_[5]][_[6]][_[7]][_[8]][_[9]]
      }  else if (_.length == 12) {
        obj =  self['data'][_[0]][_[1]][_[2]][_[3]][_[4]][_[5]][_[6]][_[7]][_[8]][_[9]][_[10]]
      }  else if (_.length == 13) {
        obj =  self['data'][_[0]][_[1]][_[2]][_[3]][_[4]][_[5]][_[6]][_[7]][_[8]][_[9]][_[10]][_[11]]
      }   else if (_.length == 14) {
        obj =  self['data'][_[0]][_[1]][_[2]][_[3]][_[4]][_[5]][_[6]][_[7]][_[8]][_[9]][_[10]][_[11]][_[12]]
      }
      return obj
}
function addScopeProp(self,prop) {
    let elements = self.element.querySelectorAll('[dataBind]')
    if (!self.scope.hasOwnProperty(prop)) {
        var value 
        Object.defineProperty(self.scope,prop, {
            set: function(newValue) {
                value = newValue
                elements.forEach((element) => {
                    if (element.getAttribute('dataBind') == prop) {
                      if (element.type && (element.type == 'text' || element.type == 'textarea')) {
                          element.value = newValue
                          element.focus()
                      } else if (element.type && element.type == 'checkbox') {
                        element.value = newValue
                      }  else if (element.type && element.type == 'radio') {
                        element.value = newValue
                      } else if (element.tagName == 'SELECT') {
                        for (let i=0;i<element.options.length;i++) {
                          if (element.options[i].value == newValue) {
                            element.options[i].selected = true
                            break
                          }
                        }
                      } else if (!element.type) {
                          element.innerHTML = newValue
                      }
                    }
                })
            },
            get: function() {
              return value
            },
            enumerable: true
        })
}
}
function getCorrectRadio(attributes, dataBind) {
  for (let i=0;i<attributes.length;i++) {
    if (attributes[i].name == 'databind' && attributes[i].nodeValue == dataBind) {
      return true
    }
  }
  return false
}