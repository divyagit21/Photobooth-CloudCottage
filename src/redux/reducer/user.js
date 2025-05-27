import {LOGIN} from '../action/user.js'

const initialState={
    user:'',
    token:''
}

export const userDetails=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN:{
            return {...state,user:action.payload.user,token:action.payload.token};
        }
        default:
            return state;
    }
}