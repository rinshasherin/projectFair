import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logContext } from '../contextapi/AuthContext';

function Header() {

  const nav=useNavigate()

  const {setLogStatus}=useContext(logContext)

  const logout=()=>{
    sessionStorage.clear()
    toast.info("User Logged Out!!")
    setLogStatus(false)
    nav('/auth')
  }

  return (
    <>
      <Navbar className="bg-body shadow">
        <Container>
          <Navbar.Brand href="#home" style={{color:'white'}}>
          <i className="fa-solid fa-diagram-project fa-xl" style={{color:'#438afa'}} />
            {' '}
            Project Fair
          </Navbar.Brand>
          <button className="btn btn-info" onClick={logout} >Logout</button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header