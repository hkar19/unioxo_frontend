import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import ImageUploading from "react-images-uploading";
import { MediaBlock, RectShape } from 'react-placeholder/lib/placeholders';
import "react-placeholder/lib/reactPlaceholder.css";
import ReactPlaceholder from 'react-placeholder';
import { connect } from 'react-redux';
import { addUser } from '../../reduxStore/reduxActions';
import LinkButton from '../../components/LinkButton';

const RegistrationPage = ({addUser,registeredUsers = []}) => {
  const [namaMhs, setNamaMhs] = useState('');
  const [nim, setNim] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [showModal, setShowModal] = useState({
    isShown: false, header: '', message: ''
  });
  const [successModal, setSuccessModal] = useState({
    isShown: false, header: '', message:''
  })
  const [passValidity, setPassValidity] = useState(false);
  const [passRepeatValidity, setPassRepeatValidity] = useState(false);

  const [fotoMhs, setFotoMhs] = useState(null);

  const namaMhsRef = useRef();

  useEffect(() => {
    console.log({registeredUsers});
    if(namaMhsRef.current) namaMhsRef.current.focus()
  }, [])

  const onSubmitForm = (e)=>{
    e.preventDefault();
    // toggleModal(true)
    console.log("Clicked");
    if(!fotoMhs) {
      console.log("here?");
      toggleModal(true,'Gagal', 'Silakan masukkan foto')
      return;
    }

    if(!passValidity){
      toggleModal(true,'Gagal', 'Password terdiri dari minimal 8 karakter, terdiri huruf besar dan kecil, minimal 1 angka, dan 1 karakter spesial');
      return;
    }

    if(!passRepeatValidity){
      // console.log("Here?");
      toggleModal(true,'Gagal', 'Silakan ulangi password anda');
      return;
    }

    let findUser = registeredUsers.find((val)=>{
      return val.userName === userName;
    })

    if(!!findUser){
      toggleModal(true,'Gagal', 'User name sudah digunakan, silahkan diganti');
      return;
    }

    let mahasiswa = {
      nama: namaMhs,
      nim: nim,
      user_name: userName,
      password: password,
      fotoURL: fotoMhs[0].dataURL
    }
    addUser(mahasiswa)
    toggleSuccessModal(true, 'Berhasil', 'Anda akan dikembalikan ke halaman login')
  }

  const handleNameInput=(e)=>{
    const val = e.target.value;
    if(val.length <=30) setNamaMhs(val)
  }

  const handleNIMInput = (e)=>{
    const val = `${e.target.value}`;
    if(val.length <=10) setNim(val);
  }

  const handleUserNameInput = (e)=>{
    const eCopy = {...e}
    const val = eCopy.target.value + '';
    // console.log({target: eCopy.target});
    if(val.length<=30) setUserName(val.replace(/\s/g, "").toLowerCase())
  }

  const handlePasswordInput = (e)=>{
    let val = e.target.value;
    setPassword(val);
    setPassValidity(isPasswordValid(val))
  }

  const handlePasswordRepeat = (e)=>{
    let val = e.target.value;
    setPasswordRepeat(val);
    setPassRepeatValidity(val === password);
  }

  const handlePictureUpload = (picture)=>{
    console.log({picture});
  }

  const toggleModal = (isShown = false, header= '', message = '')=>{
    setShowModal({isShown, header, message});
  }

  const toggleSuccessModal = (isShown = false, header= '', message = '')=>{
    setSuccessModal({isShown, header, message});
  }

  const isPasswordValid = (password = '')=>{
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  }

  return (
    <div className='container'>
      <div className='card-container' style={{flexDirection: 'row', width:'70vw'}}>
        <div style={{
          flex:2, 
          // backgroundColor:'aqua', 
          display:'flex', 
          flexBasis: 300,
          flexDirection:'column'
          }}>
          <h1>Form</h1>
          <Form style={{padding: '10px'}} onSubmit={onSubmitForm}>
            <FormGroup>
              <Label for='nama_mhs'>Nama</Label>
              <Input 
                id='nama_mhs'
                bsSize='sm'
                required
                ref={namaMhsRef}
                value={namaMhs}
                onChange={handleNameInput}
                placeholder="Nama"
              />
            </FormGroup>
            <FormGroup>
              <Label for='nim_mhs'>NIM</Label>
              <Input
                id='nim_mhs'
                bsSize='sm'
                required
                value={nim}
                onChange={handleNIMInput}
                placeholder="Nomor Induk Mahasiswa"
              />
            </FormGroup>
            <hr/>
            <FormGroup>
              <Label for='user_name'>User name</Label>
              <Input
                id='user_name'
                bsSize='sm'
                required
                value={userName}
                onChange={handleUserNameInput}
                placeholder="User name"
              />
            </FormGroup>
            <FormGroup className="position-relative">
              <Label for='password'>Password</Label>
              <Input
                id='password'
                bsSize='sm'
                required
                type='password'
                autoComplete='on'
                value={password}
                onChange={handlePasswordInput}
                placeholder="Password"
                valid={passValidity}
                invalid={ !!password.length && !passValidity}
                // valid={true}
              />
              <FormFeedback tooltip>
                minimal 8 karakter, terdiri huruf besar dan kecil, minimal 1 angka, dan 1 karakter spesial
              </FormFeedback>
            </FormGroup>
            <FormGroup className="position-relative">
              <Label for='pass_repeat'>Ulangi password</Label>
              <Input
                id='pass_repeat'
                bsSize='sm'
                type='password'
                required
                value={passwordRepeat}
                onChange={handlePasswordRepeat}
                placeholder="Ulangi password"
                invalid={!!passwordRepeat.length && !passRepeatValidity}
                valid={ !!passwordRepeat.length && passRepeatValidity}
              />
              <FormFeedback tooltip>
                Password tidak sama
              </FormFeedback>
            </FormGroup>
            <Button type='submit'>Submit</Button>
          </Form>
        </div>
        <div style={{display:'flex', flexDirection:'column',flex:1, 
        // backgroundColor:'red', 
        padding: '0 10px'}}>
          <h1>Foto</h1>
          <ImageUploading
            maxFileSize={0.5*1024*1024}
            onChange={(imageList)=>{
              console.log({imageList});
              if(!!imageList[0]) setFotoMhs(imageList)
            }}
            onError={(errors, files)=>{
              console.log({errors, files});
            }}
            acceptType={["jpg", "jpeg", "png"]}
          >
            {({ imageList, onImageUpload, onImageRemoveAll, errors, isDragging, dragProps })=>{
              // console.log({imageList, length: imageList.length})
              return (
                <>
                {fotoMhs && !!fotoMhs[0] ? <img 
                  {...dragProps}
                  src={fotoMhs[0].dataURL}
                  style={{
                    height: '40vh', width:'40vh', objectFit:'cover'
                  }}
                  />:
                  <div 
                  {...dragProps}
                  onClick={onImageUpload}
                  style={{ 
                    alignSelf: 'center',display:'flex', 
                    flexDirection:'column', 
                    justifyContent: 'center',
                    height: '40vh', width: '40vh',
                    backgroundColor: isDragging ? '#999999' : 'white'
                    }}>
                    <p style={{textAlign: 'center'}}>Taruh foto anda disini<br/>file: jpg|jpeg|png, max:500kb</p>
                    
                  </div>
                }
                {
                  fotoMhs && !!fotoMhs[0] ? <Button onClick={()=>setFotoMhs(null)}> Hapus </Button> : []
                }

                {/* {!imageList[0] && } */}
                {errors && 
                <div>
                  {errors.acceptType && <span>Hanya file jpg|jpeg|png yang diperbolehkan</span>}
                  {errors.maxFileSize && <span>File lebih besar dari 500kb</span>}
                </div>
                }
                {/* <Input type='file'/> */}
                {/* <Button type='button'></Button> */}
                {/* <Button>Chu</Button> */}
                </>
              )
            }}
          </ImageUploading>
          
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
          <Button onClick={()=>toggleModal(false)}>Tutup</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={successModal.isShown}>
        <ModalHeader>
          {successModal.header}
        </ModalHeader>
        <ModalBody>
          {successModal.message}
        </ModalBody>
        <ModalFooter>
          {/* <Button onClick={()=>toggleSuccessModal(false)}>Kembali</Button> */}
          <LinkButton to="/login">Kembali</LinkButton>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default connect(({registeredUsers})=>({registeredUsers}),{ addUser })(RegistrationPage)
