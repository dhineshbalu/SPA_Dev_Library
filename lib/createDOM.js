import tagNames from './tagNames.js'
let  propsData = {

}
let  slotsData = {

}
let modelData = {

}
let customEvents = {

}
let customBinding = {

}
let allTags = []
export default function newComp() {
    let el = document.createElement(arguments[0])
    propsData = {}
    slotsData = {}
    modelData = {}
    customEvents = {}
    customBinding = {}
    for (let i=1;i<arguments.length;i++) {
        if (typeof arguments[i] == 'string') {
          el.innerText = arguments[i]
        } else if (typeof arguments[i] == 'object' && typeof arguments[i]['attr'] == 'object') {
            let obj = arguments[i]['attr']
            processAttributes(el,obj,arguments[0])
        }  else if (typeof arguments[i] == 'object' && typeof arguments[i]['events'] == 'object') {
            let eventObject = arguments[i]['events']
            processEvents(el,eventObject)
        } else if (typeof arguments[i] == 'object' && typeof arguments[i]['slots'] == 'object') {
            let slotsObject = arguments[i]['slots']
            processSlots(el,slotsObject)
        }  else if (typeof arguments[i] == 'object' && typeof arguments[i]['cusEvent'] == 'object') {
            let cusEvent = arguments[i]['cusEvent']
            processCusEvent(el,cusEvent)
        }   else if (typeof arguments[i] == 'object' && typeof arguments[i]['customBinding'] == 'object') {
            let customBinding = arguments[i]['customBinding']
            processCustomBinding(el,customBinding)
        }   else if (typeof arguments[i] == 'object') {
            el.appendChild(arguments[i])
        }
    }
    return {
        element: el,
        propsData: propsData,
        slotsData: slotsData,
        modelData: modelData,
        customEvents: customEvents,
        customBinding: customBinding
    }
    
}
function processAttributes(el,obj,parent) {
for (let prop in obj) {
    if (prop == 'class') {
        if (typeof obj[prop] == 'object') {
            let classes = ''
            for (let idx in obj[prop]) {
            classes += obj[prop][idx]
            if (idx != obj[prop].length-1)
            classes += ' '
            }
            el.setAttribute('class',classes)
        }  else if (typeof obj[prop] == 'string') {
            el.setAttribute('class',obj[prop])
        }
    } else if (prop == 'style') {
        let styleObject = obj[prop]
        let styles = ''
        for (let style in styleObject) {
            styles += processStyleName(style)
            styles += ':'
            styles += styleObject[style]
            styles += ';'
        }
        el.setAttribute('style',styles.substring(0,styles.length-1))
    } else if (tagNames.includes(el.localName)) {
        el.setAttribute(prop,obj[prop])                        
    } 
    else {
            if (prop == 'id') {
                el.setAttribute('id',obj[prop])
            }
            // let id = el.getAttribute('id')
            if (typeof propsData[el.tagName] == 'undefined') {
                propsData[el.tagName] = {}
            }
            // if (typeof propsData[el.tagName][id] =='undefined') {
            //     propsData[el.tagName][id] = {}
            // }
            propsData[el.tagName][prop] = obj[prop]
            // console.log(propsData)
    //    if (el.getAttribute(prop) == '[object Object]') {
    //         let id = el.getAttribute('id')
    //         if (typeof propsData[id] == 'undefined') {
    //             propsData[id] = {}
    //         }
    //         propsData[id][prop] = obj[prop]
    //         console.log(propsData)
    //    }
    }
}
}
function processEvents(el,obj) {
    for (let prop in obj) {
        setTimeout(() => {
            el.addEventListener(prop,obj[prop])
        }, 100)
    }
}
function processStyleName(styleName) {
let updatedStyleName = ''
for (let i=0;i<styleName.length;i++) {
    if (styleName[i] >= 'A' && styleName[i] <= 'Z') {
        updatedStyleName += '-'
        updatedStyleName += styleName[i].toLowerCase()
    } else {
        updatedStyleName += styleName[i]
    }
} 
return updatedStyleName
}
function processSlots(el,obj) {
for (let prop in obj) {
    if (typeof slotsData[el.tagName] == 'undefined') {
        slotsData[el.tagName] = {}
    }
    slotsData[el.tagName][prop] = obj[prop]
}
}
function processCusEvent(el,obj) {
    for (let prop in obj) {
        if (typeof customEvents[el.tagName] == 'undefined') {
            customEvents[el.tagName] = {}
        }
        customEvents[el.tagName][prop] = obj[prop]
    }  
}
function processCustomBinding(el,obj) {
    for (let prop in obj) {
        if (typeof customBinding[el.tagName] == 'undefined') {
            customBinding[el.tagName] = {}
        }
        customBinding[el.tagName][prop] = obj[prop]
    }  
}
function processTags() {
    for (let i=0;i<tagNames.length;i++) {
        allTags[i] = function () {
            let el = document.createElement(tagNames[i])
            for (let i=0;i<arguments.length;i++) {
                if (typeof arguments[i] == 'string') {
                    el.innerText = arguments[i]
                } else if (typeof arguments[i] == 'object' && typeof arguments[i]['attr'] == 'object') {
                    let obj = arguments[i]['attr']
                    processAttributes(el,obj,arguments[0])
                }  else if (typeof arguments[i] == 'object' && typeof arguments[i]['events'] == 'object') {
                    let eventObject = arguments[i]['events']
                    processEvents(el,eventObject)
                } else if (typeof arguments[i] == 'object' && typeof arguments[i]['slots'] == 'object') {
                    let slotsObject = arguments[i]['slots']
                    processSlots(el,slotsObject)
                } else if (typeof arguments[i] == 'object') {
                    el.appendChild(arguments[i])
                }
            }
            return el
        }
    }
    for (let i=0;i<tagNames.length;i++) {
        window[tagNames[i]] = allTags[i]
    }
}
processTags()
window.newComp = newComp
 
