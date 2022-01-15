import * as types from '../Actions/TYPES'
const init={
    users:[],
    products:[],
    transactions:[]
}

const adminReducer = (state=init,action)=>{

    switch (action.type) {
    
        case types.GEL_ALL_USERS:
            return{
                ...state,
                users:action.users
            }

        case types.GET_ALL_PRODUCTS:
        return {
            ...state,
            products:action.products
        }
        default:
            return state;
    }
}

export default adminReducer