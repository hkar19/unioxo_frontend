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
      // console.log({users});
      return {...state, registeredUsers: users}
    }

    case REGISTER_USER: {
      let user = action.payload;
      // do not store fotoURL
      console.log({a: state.registeredUsers})
      let storeToCookeFunction = action.function;
      // console.log({storeToCookeFunction});
      // console.log({payload: action.payload});
      let newRegisteredUsers = [...state.registeredUsers, user];
      // let {fotoURL, ...rest} = user;
      // let userstoCookie = [...state.registeredUsers, rest]
      // let newRegisteredUsers = [];
      // let userstoCookie = []
      // newRegisteredUsers.push(state.registeredUsers,user);
      // userstoCookie.push(state.registeredUsers, rest);
      // console.log(newRegisteredUsers);
      // storeToCookeFunction(userstoCookie);
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