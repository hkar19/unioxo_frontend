import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import ImageUploading from "react-images-uploading";
import { MediaBlock, RectShape } from 'react-placeholder/lib/placeholders';
import "react-placeholder/lib/reactPlaceholder.css";
import ReactPlaceholder from 'react-placeholder';

const RegistrationPage = () => {
  const [namaMhs, setNamaMhs] = useState('');
  const [nim, setNim] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  // const [showModal, setShowModal] = useState(false);
  const [passValidity, setPassValidity] = useState(false);
  const [passRepeatValidity, setPassRepeatValidity] = useState(false);

  const [fotoMhs, setFotoMhs] = useState(null);

  const namaMhsRef = useRef();

  useEffect(() => {
    if(namaMhsRef.current) namaMhsRef.current.focus()
  }, [])

  const onSubmitForm = (e)=>{
    e.preventDefault();
    // toggleModal(true)
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

  const isPasswordValid = (password = '')=>{
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  }

  return (
    <div className='container'>
      <div className='card-container' style={{flexDirection: 'row', width:'70vw'}}>
        <div style={{
          flex:2, 
          backgroundColor:'aqua', 
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
        <div style={{display:'flex', flexDirection:'column',flex:1, backgroundColor:'red', padding: '0 10px'}}>
          <ImageUploading>
            {({ imageList, onImageUpload, onImageRemoveAll, errors, isDragging })=>{
              return (
                <>
                {/* <img src={fotoMhs}/> */}
                <div style={{ alignSelf: 'center',display:'flex', flexDirection:'column', height: '40vh', width: '40vh'}}>
                  <RectShape color='blue' style={{flex:1, borderRadius:15}}/>
                </div>
                <Button>Ha</Button>
                <Button>Chu</Button>
                </>
              )
            }}
          </ImageUploading>
          
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
