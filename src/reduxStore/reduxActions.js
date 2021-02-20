export const LOAD_REGISTERED_USERS = 'LOAD_REGISTERED_USERS';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER ='LOGIN_USER';
export const LOGOUT_USER='LOGOUT_USER';

export const loadUsers = (users)=>{
  return {type: LOAD_REGISTERED_USERS, payload: users}
}

export const addUser = (user, addToCookieFunction)=>{
  return {type: REGISTER_USER, payload: user, function: addToCookieFunction}
}

export const letUserLogin = (user)=>{
  return {type: LOGIN_USER, payload: user}
}

export const letUserLogout = ()=>{
  return {type: LOGOUT_USER}
}