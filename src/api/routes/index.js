export const LOGIN_ROUTE='/login'
export const REGISTER_ROUTE='/register'
export const LOGOUT_ROUTE='/logout'
export const CATEGORIES_ROUTE='/categories'
export const GET_PRODUCT_ROUTE=(term)=>{
    return `/products/${term}`
}
export const GET_IDN_PRODUCT=(term)=>{
    return `/products/show/${term}`
}
export const DELETE_USER_ROUTE=(term)=>{
    return `/users/${term}`
}
export const GET_ALL_USERS_ROUte ='/users'
export const GET_ALL_PRODUCTS_ROUTE='/products'

export const MAKE_PRODUCT_ROUTE='/products'
export const DELETE_PRODUCT_ROUTE=(term)=>{
    return `/products/${term}`
}
export const UPDATE_PRODUCT=(term)=>{
    return `/products/${term}`
}
export const GET_ALL_SALES='/users/sales '

export const BUY_PRODUCT_ROUTE='/payment/pay/';

export const GET_USER_INFO=(term)=>{
    return `/users/${term}`
}