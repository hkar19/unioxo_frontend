import React, { useEffect } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import HomePage from './routes/HomePage'
import LoginPage from './routes/LoginPage'
import RegistrationPage from './routes/RegistrationPage'

import store from "./reduxStore";
import ProfilePage from './routes/ProfilePage'

import './App.css'
import { useCookies } from 'react-cookie'
import { loadUsers } from './reduxStore/reduxActions'

const App = ({currentUser, loadUsers}) => {

  const [cookies, setCookies, removeCookies] = useCookies(['stored_users']);
  
  // useEffect(() => {
  //   let cookie = cookies
  //   console.log({cookie});
  //   console.log({registeredUsers: props.registeredUsers});
  // })

  useEffect(()=>{
    let cookie = cookies['stored_users'];
    if(cookie) loadUsers(cookie);
  },[loadUsers, cookies])

  useEffect(()=>{
    const deleteCookie = ()=>{
      removeCookies('stored_users',{path: '/', maxAge: 12*60*60});
    }
    deleteCookie()
    console.log('done')
  },[])

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login'>
          {currentUser ? <Redirect to='/home'/> : <LoginPage/>}
        </Route>
        <Route path='/registration'>
          <RegistrationPage/>
        </Route>
        <Route path='/home/profile'>
          {currentUser ? <ProfilePage/>: <Redirect to='login'/>}
        </Route>
        <Route path='/home'>
          {currentUser ? <HomePage/>: <Redirect to='/login'/>}
        </Route>
        <Route path='/' >
          {currentUser ? <Redirect to='/home'/> : <Redirect to='login'/>}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

const AppWrapped = ()=>{
//  loadUsers
  const AppConnected = connect((states)=>({...states}),{loadUsers})(App);

  return (
    <Provider store={store}>
      <AppConnected/>
    </Provider>
  )
}

export default AppWrapped
