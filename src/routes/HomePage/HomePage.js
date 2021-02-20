import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row } from 'reactstrap'

import dummyPict from "../../assets/21294.png";
import LinkButton from '../../components/LinkButton';
import { letUserLogout } from '../../reduxStore/reduxActions';

const HomePage = ({currentUser, letUserLogout}) => {

  // useEffect(() => {
  //   console.log(currentUser)
  // }, [])

  return (
    <div className='container'>
      <div className='card-container'>
        <h1>Home</h1>
        <img
          alt="Foto Mahasiswa"
          src={currentUser.fotoURL ? currentUser.fotoURL : dummyPict}
          width='250px'
          height='250px'
        />
        <Row>
          <Col>
            <Row>
              <Col xs={3}>Nama</Col>
              <Col xs={5}>{`:${currentUser.nama}`}</Col>
            </Row>
            <Row>
              <Col xs={3}>NIM</Col>
              <Col xs={5}>{`:${currentUser.nim}`}</Col>
            </Row>
          </Col>
        </Row>
        {/* <Button>Ke Profile</Button> */}
        <LinkButton to="/home/profile">Ke Profile</LinkButton>
        <hr/>
        <Button color='warning' onClick={()=>letUserLogout()}>Logout</Button>
      </div>
    </div>
  )
}
// letUserLogout
export default connect((state)=>({...state}),{ letUserLogout })(HomePage)

