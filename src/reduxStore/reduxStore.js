import { createStore } from "redux"
import { REGISTER_USER } from "./reduxActions";

const initialState = {
  registeredUsers :[],
  currentUser : null,
}

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case REGISTER_USER: return state;
  
    default: return state;
  }
}

const store = createStore(reducer);

export default store;