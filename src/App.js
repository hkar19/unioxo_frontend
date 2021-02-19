import React from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import HomePage from './routes/HomePage'
import LoginPage from './routes/LoginPage'
import RegistrationPage from './routes/RegistrationPage'

import store from "./reduxStore";
import ProfilePage from './routes/ProfilePage'

import './App.css'

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login'>
          {props.currentUser ? <Redirect to='/home'/> : <LoginPage/>}
        </Route>
        <Route path='/registration'>
          <RegistrationPage/>
        </Route>
        <Route path='/home/profile'>
          {props.currentUser ? <ProfilePage/>: <Redirect to='login'/>}
        </Route>
        <Route path='/home'>
          {props.currentUser ? <HomePage/>: <Redirect to='/login'/>}
        </Route>
        <Route path='/' >
          {props.currentUser ? <Redirect to='/home'/> : <Redirect to='login'/>}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

const AppWrapped = ()=>{

  const AppConnected = connect((states)=>({...states}))(App);

  return (
    <Provider store={store}>
      <AppConnected/>
    </Provider>
  )
}

export default AppWrapped
