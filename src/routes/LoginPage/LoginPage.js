import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { letUserLogin } from '../../reduxStore/reduxActions'

const LoginPage = ({registeredUsers , letUserLogin}) => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [showModal, setShowModal] = useState({
    isShown: false, header: '', message:''
  })

  const userNameRef = useRef();

  useEffect(() => {
    // console.log({registeredUsers});
    userNameRef.current.focus()

  }, [])

  const onSubmitLogin = (e)=>{
    e.preventDefault();
    console.log(registeredUsers);
    let foundUser = registeredUsers && registeredUsers.find(val=>{
      // console.log({val});
      return val.user_name === userName
    })

    if(foundUser){
      if(foundUser.password === password){
        // toggleModal(true,'Berhasil','Berhasil masuk');
        letUserLogin(foundUser)
      }
      else{
        // console.log("here?");
        toggleModal(true, 'Gagal', 'Password salah atau user tidak ditemukan');
      }
    } else {
      toggleModal(true, 'Gagal', 'Password salah atau user tidak ditemukan');
    }
    // alert("login bro")
    // toggleModal(true,'makjang','lalu')
  }

  const toggleModal = (isShown=false, header='', message='')=>{
    setShowModal({isShown, header, message});
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
      <Modal isOpen={showModal.isShown}>
        <ModalHeader>
          {showModal.header}
        </ModalHeader>
        <ModalBody>
          {showModal.message}
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>toggleModal(false)}>Kembali</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
// userLogin
// letUserLogin
export default connect(({registeredUsers})=>({registeredUsers}),{ letUserLogin })(LoginPage)
