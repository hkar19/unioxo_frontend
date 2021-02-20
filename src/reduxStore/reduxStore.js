import { createStore } from "redux"
import { LOAD_REGISTERED_USERS, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "./reduxActions";

const initialState = {
  registeredUsers :[],
  currentUser : null,
}

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case LOAD_REGISTERED_USERS:{
      let users = action.payload;
      return {...state, registeredUsers: users}
    }

    case REGISTER_USER: {
      let user = action.payload;
      console.log({payload: action.payload});
      let newRegisteredUsers = [...state.registeredUsers, user];
      return {...state, registeredUsers: newRegisteredUsers}
    };

    case LOGIN_USER:{
      let user = action.payload;
      return {...state, currentUser: user};
    }
    case LOGOUT_USER:{
      return {...state, currentUser:null};
    }
  
    default: return state;
  }
}

const store = createStore(reducer);

export default store;