import {COIN_INSERTED} from '../action/coin.js'

const initialState={
    coin:false
}

export const coinDetails=(state=initialState,action)=>{
    switch (action.type){
        case COIN_INSERTED:{
            return {...state,coin:action.payload.coin};
        }
        default:
            return state;
    }
}
