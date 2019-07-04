import * as Types from './../constants/ActionType';

var initialState = {};

const itemEditting = (state = initialState, action) => {
    switch (action.type){
        case Types.EDIT_PRODUCT:
            return action.product;
        default: return state;
    }
}
export default itemEditting;