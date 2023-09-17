const redux = require('redux')
const produce = require('immer').produce

const initialState = {
    name : 'Bitna Gu',
    address : {
        street : 'GwanGok-Ro',
        city : 'Yongyin',
        state : 'Gyeongyi Province'
    },
}

const STREET_UPDATED = 'STREET_UPDATED'

const updateStreet = (street) => {
    return {
        type : STREET_UPDATED,
        payload : street,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case STREET_UPDATED :
//            return {
//            ...state,
//            address : {
//                ...state.address,
//                street : action.payload,
//                },
//            }
        return produce(state, (draft) => {
            draft.address.street = action.payload
        })
//       위의 두개 똑같은 것임
// sudo npm i immer, node nested-state
        default : {
            return state
        }
    }
}

const store = redux.createStore(reducer)
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(()=>{
    console.log('Updated State', store.getState())
})
store.dispatch(updateStreet('456 Main St'))
unsubscribe()