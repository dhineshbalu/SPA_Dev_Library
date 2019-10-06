import LandingPage from './components/LandingPage.js'
// import D_Loader from './generic/D_Loader.js'
// import D_Loader_Text from './generic/D_Loader_Text.js'

export default class App {
    constructor(target) {
        this.element = target
        this.name = 'App'
    }
    components() {
        return [LandingPage]
    }
    created() {
        return {
         
        }
    }
    methods() {
        return {
            
        }
    }
    data() {
        return {
         
        }
    }
    render() {
     const self = this
    _.init(self)

    // _.append(self.element,_.custom(self,'D_Loader_1', newComp('D_Loader', 
    //    {attr: {id: 'D_Loader_1'}}
    // )))

    // _.append(self.element,_.custom(self,'D_Loader_Text_1', newComp('D_Loader_Text', 
    //   {attr: {id: 'D_Loader_Text_1'}}
    // )))


    _.append(self.element,_.custom(self,'LandingPage', newComp('LandingPage', 
      {
          attr: {
              id: 'LandingPage'
          }
      }
    )))

   /* Normal Loader */
     
    // setTimeout(()=> {
    //     events.emit('showLoad', {
    //       show: true
    //     })
    //   }, 5000)

    //   setTimeout(()=> {
    //     events.emit('offLoad', {
    //         show: false
    //     })
    //   }, 10000)

      /* Text Loader */

    //  setTimeout(()=> {
    //     events.emit('showLoad_Text', {
    //       show: true,
    //       text: 'Loading 1%'
    //     })
    //   }, 100)

      // setTimeout(()=> {
      //   events.emit('showLoad_Text', {
      //     show: true,
      //     text: 'Loading 5%'
      //   })
      // }, 500)
      // setTimeout(()=> {
      //   events.emit('showLoad_Text', {
      //     show: true,
      //     text: 'Loading 10%'
      //   })
      // }, 1000)
      // setTimeout(()=> {
      //   events.emit('showLoad_Text', {
      //     show: true,
      //     text: 'Loading 100%'
      //   })
      // }, 2000)
      // setTimeout(()=> {
      //   events.emit('offLoad_Text', {
      //       show: false
      //   })
      // }, 2200)

    }
}