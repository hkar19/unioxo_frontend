import axios from 'axios';
import React,{ useState , useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap'
import env from "react-dotenv";

const ProfilePage = ({history}) => {
  const [userData, setUserData] = useState({});

  useEffect( () => {
     const fetchData = async () =>{
      let creds = {
        username: env.TELU_USERNAME,
        password: env.TELU_PASSWORD
      }
  
      let tokenURL = env.TELU_TOKENLINK;
      // console.log(creds);
  
      let token = await axios.post(tokenURL,creds).catch(err=>{console.error(err);})
      // console.log(token);
      let config = {
        headers:{
          Authorization: 'Bearer ' + token
        }
      }
      let data = await axios.post(env.TELU_PROFILELINK,null, config);
      // console.log(data);
      setUserData(data);
    }

    fetchData()
  }, [])

  return (
    <div className='container'>
      <div className='card-container'>
        <h1>Profile</h1>
        <img
          alt="Foto Mahasiswa"
          src={ userData && userData.foto ? userData.foto : ''}
          width='250px'
          height='250px'
        />
        <Row>
          <Col>
            <Row>
              <Col xs={3}>Nama</Col>
              <Col xs={5}>{`:${userData.fullname}`}</Col>
            </Row>
            <Row>
              <Col xs={3}>NIM</Col>
              <Col xs={5}>{`:${userData.numberid}`}</Col>
            </Row>
          </Col>
        </Row>
        {/* <Button>Ke Profile</Button> */}
        {/* <LinkButton to="/home/profile">Ke Profile</LinkButton> */}
        <Button onClick={()=>history.goBack()}>Kembali</Button>
        {/* <hr/>
        <Button color='warning' onClick={()=>letUserLogout()}>Logout</Button> */}
      </div>
    </div>
  )
}

export default withRouter(ProfilePage)
