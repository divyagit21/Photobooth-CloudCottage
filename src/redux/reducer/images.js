import { ADD_IMAGE, CLEAR_IMAGE } from '../action/images.js'

const initialState = {
    images: [],
    selectedLayout: ''
}

export const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_IMAGE:
            return { ...state, images: [...state.images, action.payload] };
        case CLEAR_IMAGE:
            return initialState;
        default:
            return state;

    }

}