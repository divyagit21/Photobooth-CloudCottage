import { LAYOUTS } from '../action/layouts.js'

const initialState = {
    layouts: 0,
    images:0
}

export const layoutsDetails = (state = initialState, action) => {
    switch(action.type){
        case LAYOUTS:
            console.log(action.payload)
            return {...state,layouts:action.payload.layouts,images:action.payload.images};
        default:
            return state;
    }
}