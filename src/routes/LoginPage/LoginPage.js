import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const userNameRef = useRef();

  useEffect(() => {
    userNameRef.current.focus()

  }, [])

  const onSubmitLogin = (e)=>{
    e.preventDefault()
    alert("login bro")
  }

  return (
    <div className='container'>
      <div className='card-container'>
        <h1 style={{marginBottom: '10px', alignSelf:'center'}}>Login</h1>
        <form 
        style={{
          flex: 1,
          display:'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
          // backgroundColor: 'cyan'
        }}
        onSubmit={onSubmitLogin}>
          <div style={{display:'flex', flexDirection:'column', margin: '5px 0'}}>
            <label htmlFor='user_name'> Masukkan user name</label>
            <input ref={userNameRef} value={userName} onChange={e=>setUserName(e.target.value)} id='user_name' placeholder="user name"/>
          </div>
          
          <div style={{display:'flex', flexDirection:'column', margin: '5px 0'}}>
            <label htmlFor='user_password'> Masukkan password</label>
            <input type='password' value={password} onChange={e=>setPassword(e.target.value)} id='user_password' placeholder="password"/>
          </div>

          <button type='submit' style={{marginTop: '10px'}}>submit</button>
        </form>

        <div style={{alignSelf:'center'}}> 
          <p>Belum punya akun? silakan registrasi <Link to='/registration'>disini</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
