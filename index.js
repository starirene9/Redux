//import redux from 'redux'
const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake(){
return {
        type : CAKE_ORDERED,
        payload : 1
    }
}

function restockCake(qty = 1) {
    return {
        type : CAKE_RESTOCKED,
        payload : qty,
    }
}

function orderIceCream(qty = 1){
return {
        type : ICECREAM_ORDERED,
        payload : qty,
    }
}

function restockIceCream(qty = 1) {
    return {
        type : ICECREAM_RESTOCKED,
        payload : qty,
    }
}

// action : the only way can interact with the store
// objects, have a 'type' property : string

// reducer function
// (previousState, action) => newState

const initialCakeState = {
    numOfCakes : 10,
//    anotherProperty : 0
}

const initialIceCreamState = {
    numOfIceCream : 20,
}

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
//  copy the state of object(spread operator) and only needed one below
                numOfCakes : state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED :
            return {
                ...state,
                numOfCakes : state.numOfCakes + action.payload
//               // quantity 에서 payload 로 이름 설정
             }
        default :
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {

        case ICECREAM_ORDERED:
                    return {
                        ...state,
        //  copy the state of object(spread operator) and only needed one below
                        numOfIceCream : state.numOfIceCream - 1,
                    }
        case ICECREAM_RESTOCKED :
                    return {
                        ...state,
                        numOfIceCream : state.numOfIceCream + action.payload
        //               // quantity 에서 payload 로 이름 설정
                     }
        default :
            return state
    }
}

const rootReducer = combineReducers({
    cake : cakeReducer,
    iceCream : iceCreamReducer,
})

const store = createStore(rootReducer)
console.log('Initial state', store.getState())

const unsubscribe = store.subscribe(()=> console.log('update state', store.getState()))

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.restockCake(10)
actions.orderIceCream()
actions.restockIceCream(200)
//store.dispatch(orderCake())
//store.dispatch(orderCake())
//store.dispatch(orderCake())
//store.dispatch(restockCake(3))

unsubscribe()
