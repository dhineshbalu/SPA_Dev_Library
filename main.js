import  createComponent from './lib/createComponent.js'
import DOM from './lib/createDOM.js'
import processor from './lib/processor.js'
import Emitter from './lib/Emitter.js'
import App from './App.js'

window.events = {}
Emitter(events)


let app = new App(document.querySelector('#main'))
_.setTheComponent(app)





