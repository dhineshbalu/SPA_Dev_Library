import D_Loader from '../generic/D_Loader.js'
export default class LoaderT {
    constructor() {
        this.name = 'LoaderT'
    }
    components() {
        return [D_Loader]
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


    _.append(self.element,_.custom(self,'D_Loader_1', newComp('D_Loader', 
       {attr: {id: 'D_Loader_1'}}
    )))
        
    }
}