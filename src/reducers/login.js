import * as Types from './../constants/ActionType';


const initialState = {
  currentUser: {}
}
 
export default function reducer(state = initialState, action) {
    switch (action.type) {
      case Types.LOGIN_USER:
        return {...state, currentUser: action.payload}
      default:
        return state;
    }
  }