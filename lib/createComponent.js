import pubSub from './pubSub.js'
import updateComponent from './updateComponent.js'

  export default function createComponent(self,parent) {
      
      let name = self.name

      // to reload 
      self.reload = false

      //set the childPropsData Object
       self.childPropsData = {}

       // set the slots
       self.slotsData = {}

       //for 2Way Data Binding
       self.scope = {}

       //set the custom Events 
       self.customEvents = {}

       // set the custom  value binding
       self.customBinding = {}

      self.parent = parent
      self.componentsName = []
      self.slotsComponentsName = []
      //before created
      if (self.beforeCreated) {
        let bData =   self.beforeCreated()
        for(let prp in bData) {
            self[prp] = bData[prp]
        }
      }
      //after created
      if (self.created) {
        let aData =  self.created()
        for(let prp in aData) {
            self[prp] = aData[prp]
        }
      }
      
      // iterate over each methods and assign to that object
      self.methods = self.methods ?  self.methods() : {}
      for (let method in self.methods) {
        self[method] = self.methods[method]
       }

       //creating instance
       self.events = new pubSub()


       //creating local state data to the object
       let data = self.data ? self.data() : {}

        // subscribe the event
       self.events.subscribe(name,() => self.render())

  
       //whenever the local state values gets changed call the callback function
       self.data = new Proxy(data, {
        set: function(obj,key,val) {
          if (obj[key] != val || typeof obj[key] == 'object') {
            obj[key] = val
            if (self.beforeUpdate) {
              self.beforeUpdate()
            }
            self.events.publish(name)
            
              updateComponent(self)              

            if (self.afterUpdate) {
              self.afterUpdate()
            }
          }
          return true
        } 
      })

      //  console.log(self.beforeRender)

       // before render
        if (self.beforeRender) {
            beforeRendering(self)
               rendering(self)       
        } else {
            rendering(self)
        }
  }

  function beforeRendering(self) {
    self.beforeRender()
  }

  function rendering(self) {

    // rendering the component html
    self.render = self.render ? self.render : function () {}
    self.render()

    //find the Two Way data Binding attributes

    TwoWayDataBinding(self)

    // storing the childrens

    self.childrens = []

    self.slotsChildrens = []

    // goint to the sub component and loading it dynamically
    self.components = self.components ? self.components() : []

    self.slotComponents = self.slotComponents ? self.slotComponents() : []

    for(let component of self.components) {
        let cmp = new component()
        for (let qry of self.element.querySelectorAll(cmp.name)) {
        let cmp = new component() 
        if (!self.componentsName.includes(cmp.name))
          self.componentsName.push(cmp.name)
        let id = qry.getAttribute('id')
        cmp.id = id
        cmp.tagName = qry.tagName
        let tagName = qry.tagName
        if (id && tagName && self.childPropsData[id][tagName]) {
          dynamicProps(cmp,self.childPropsData[id][tagName])
          // self.childPropsData = {}
        }

        if (id && tagName && self.slotsData[id][tagName]) {
          dynamicSlots(cmp,self.slotsData[id][tagName],self)
        }

        if (id && tagName && self.customEvents[id][tagName]) {
          dynamicEvents(cmp,self.customEvents[id][tagName])
        }

        if (id && tagName && self.customBinding[id][tagName]) {
          let bind = self.customBinding[id][tagName]['dataBind']
          cmp['props']['value'] = self['data'][bind]
        }

        // let id = qry.getAttribute('id') ? qry.getAttribute('id') : ''
        // cmp.id = id
        self.childrens.push(cmp)

        cmp.element =  qry  
        //    var src = document.createElement('div')
        //    let idValue = cmp.name + '_' + Math.floor(Math.random() * 100);
        //    src.setAttribute('id',idValue)
        //    var tgt = self.element.querySelector(cmp.name)
        //    self.element.replaceChild(src, tgt);
        if (typeof cmp.slotComponent == 'undefined' || cmp.slotComponent != true) {
          createComponent(cmp,self)                                
        } else {
           // //rendering the component html
          cmp.render = cmp.render ? cmp.render : function () {}
          cmp.render()
        }
      } 
    }
    for(let component of self.slotComponents) {
      let cmp = new component()
      for (let qry of self.element.querySelectorAll(cmp.name)) {
      let cmp = new component() 
      if (!self.slotsComponentsName.includes(cmp.name))
        self.slotsComponentsName.push(cmp.name)
      let id = qry.getAttribute('id')
      cmp.id = id
      cmp.tagName = qry.tagName
      let tagName = qry.tagName
      if (id && tagName && self.childPropsData[id][tagName]) {
        dynamicProps(cmp,self.childPropsData[id][tagName])
        // self.childPropsData = {}
      }

      if (id && tagName && self.slotsData[id][tagName]) {
        dynamicSlots(cmp,self.slotsData[id][tagName],self)
      }

      if (id && tagName && self.customEvents[id][tagName]) {
        dynamicEvents(cmp,self.customEvents[id][tagName])
      }

      if (id && tagName && self.customBinding[id][tagName]) {
        let bind = self.customBinding[id][tagName]['dataBind']
        cmp['props']['value'] = self['data'][bind]
      }

      // let id = qry.getAttribute('id') ? qry.getAttribute('id') : ''
      // cmp.id = id
      self.slotsChildrens.push(cmp)

      cmp.element =  qry  
      //    var src = document.createElement('div')
      //    let idValue = cmp.name + '_' + Math.floor(Math.random() * 100);
      //    src.setAttribute('id',idValue)
      //    var tgt = self.element.querySelector(cmp.name)
      //    self.element.replaceChild(src, tgt);
      if (typeof cmp.slotComponent == 'undefined' || cmp.slotComponent != true) {
        createComponent(cmp,self)                                
      } else {
         // //rendering the component html
        cmp.render = cmp.render ? cmp.render : function () {}
        cmp.render()
      }
    } 
  }
  }
  // function createProps(self,element) {
  //    self['props'] = {}
  //   for (let i=0;i<element.attributes.length;i++) {
  //     self['props'][element.attributes[i].name] = element.attributes[i].value
  //   }
  // }
  function dynamicProps(self,props) {
    self['props'] = {}
    for (let properties in props) {
      self['props'][properties] = props[properties]
    }
  }
  function dynamicSlots(self,slots,parent) {
    
    self['slots'] = {}
    for (let element in slots) {
      self['slots'][element] = slots[element]
      if (element.includes('newComp')) {
        createComponentFromSlots(self,slots[element],parent)
      }
    }
  }
  function dynamicEvents(self,cusEvents) {
    self['emit'] = {}
    for (let properties in cusEvents) {
      self['emit'][properties] = cusEvents[properties]
    }
  }
  function createComponentFromSlots(self,elements,parent) {
    let element = div()
    _.append(element,elements)
    if (typeof self.childrens == 'undefined') {
      assignOneTime(self)
    }
    // self.element = elements
    for(let component of self.components) {
      let cmp = new component()
      for (let qry of element.querySelectorAll(cmp.name)) {
      let cmp = new component() 
      if (self.componentsName.indexOf(cmp.name) < 0)
       self.componentsName.push(cmp.name)
      let id = qry.getAttribute('id')
      cmp.id = id
      let tagName = qry.tagName
      if (id && tagName && parent.childPropsData[id][tagName]) {
        dynamicProps(cmp,parent.childPropsData[id][tagName])
        // self.childPropsData = {}
      }

      if (id && tagName && parent.slotsData[id][tagName]) {
        dynamicSlots(cmp,parent.slotsData[id][tagName])
      }

      if (id && tagName && parent.customEvents[id][tagName]) {
        dynamicEvents(cmp,parent.customEvents[id][tagName])
      }

      if (id && tagName && parent.customBinding[id][tagName]) {
        let bind = parent.customBinding[id][tagName]['dataBind']
        cmp['props']['value'] = parent['data'][bind]
      }

      // let id = qry.getAttribute('id') ? qry.getAttribute('id') : ''
      // cmp.id = id
      self.childrens.push(cmp)
      //    var src = document.createElement('div')
      //    let idValue = cmp.name + '_' + Math.floor(Math.random() * 100);
      //    src.setAttribute('id',idValue)
      //    var tgt = self.element.querySelector(cmp.name)
      //    self.element.replaceChild(src, tgt);
      cmp.element =  qry
      createComponent(cmp,self)          
      } 
   }
  }
  function assignOneTime(self) {
        //set the childPropsData Object
        self.childPropsData = {}

        // set the slots
        self.slotsData = {}

        self.cusEvents = {}
    
        self.parent = parent
        self.componentsName = []

        
        //before created
        if (self.beforeCreated) {
          let bData =   self.beforeCreated()
          for(let prp in bData) {
              self[prp] = bData[prp]
          }
        }
        //after created
        if (self.created) {
          let aData =  self.created()
          for(let prp in aData) {
              self[prp] = aData[prp]
          }
        }
    
        // iterate over each methods and assign to that object
        self.methods = self.methods ?  self.methods() : {}
        for (let method in self.methods) {
          self[method] = self.methods[method]
        }
    
        //creating instance
        self.events = new pubSub()
    
    
        //creating local state data to the object
        let data = self.data ? self.data() : {}
    
        // subscribe the event
        self.events.subscribe(name,() => self.render())
        
        // whenever the local state values gets changed call the callback function
        self.data = new Proxy(data, {
          set: function(obj,key,val) {
              if (self.beforeUpdate) {
                  self.beforeUpdate()
              }
              obj[key] = val
              if (self.afterUpdate) {
                  self.afterUpdate()
              }
              self.events.publish(name)
              updateComponent(self)
              // update the child component with the previous values instead of creating fresh component
              
              return true
          } 
        })
    
        // before render
          // if (self.beforeRender) {
          //     beforeRendering(self).then(() => {
          //       rendering(self)       
          //     })
          // } else {
          //     rendering(self)
          // }
          
          self.childrens = []
    
        // goint to the sub component and loading it dynamically
        self.components = self.components ? self.components() : []
    
        self.slotComponent = true
  }
  function shallowCopy(data) {
    return JSON.parse(data)
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
      } else if (element.type == 'checkbox') {
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
             self.scope[propToBind] = element.checked ? true : false 
             // obj[key] = element.checked ? true : false 
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
      } else if (element.type == 'radio') {
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
  window.shallowCopy = shallowCopy
  window.createComponent = createComponent

