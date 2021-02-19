export const REGISTER_USER = 'REGISTER_USER';

export const addUser = (user)=>{
  return {type: REGISTER_USER, payload: user}
}