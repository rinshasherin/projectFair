import React, { useContext, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { registerApi, loginApi } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { logContext } from '../contextapi/AuthContext'


function Auth() {

  const [authStatus, setAuthStatus] = useState(false)
  const [user, setUser] = useState({
    email: "", username: "", password: ""
  })

  const nav = useNavigate()

  const {setLogStatus}=useContext(logContext)

  const changeStatus = () => {
    setAuthStatus(!authStatus)
  }

  const handleRegistration = async () => {
    console.log(user)
    const { email, username, password } = user
    if (!email || !username || !password) {
      toast.warning("Enter Valid Input!!")
    }
    else {
      const res = await registerApi(user)
      console.log(res)
      if (res.status == 200) {
        toast.success("Registration Successfull!!")
        changeStatus()
        setUser({
          email: "", username: "", password: ""
        })
      }
      else {
        toast.error("Registration Failed!!")
      }
    }
  }

  const handleLogin = async () => {
    console.log(user)
    const { email, password } = user
    if (!email || !password) {
      toast.warning("Enter Valid Input!!")
    }
    else {
      const res = await loginApi(user)
      console.log(res)
      if (res.status == 200) {
        toast.success("Login Successfull!!")
        setUser({
          email: "", password: ""
        })
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('user', res.data.username)
        sessionStorage.setItem('profile', res.data.profile)
        sessionStorage.setItem('github', res.data.github)
        sessionStorage.setItem('linkedin', res.data.linkedin)
        // setAuthStatus(true)
        setLogStatus(true)
        nav('/')
      }
      else {
        toast.error("Login Failed!!")
      }
    }
  }


  return (
    <>
      <div className="container-fluid d-flex w-100 justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="w-75 border border-2 shadow shadow-lg">
          <Row>
            <Col>
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--profile-account-sign-music-app-features-pack-design-development-illustrations-3757211.png?f=webp" width={'350px'} alt="" className="img-fluid" />
            </Col>
            <Col className='d-flex flex-column justify-content-center pe-5'>
              <h4>
                {
                  authStatus ?
                    <>Registration</>
                    :
                    <>Login</>
                }
              </h4>
              <div>
                <input value={user.email} type="email" name="" id="" className="form-control my-3" placeholder='Enter Email ID' onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                {
                  authStatus &&
                  <input value={user.username} type="text" className="form-control mb-3" placeholder='Enter Username' onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
                }
                <input value={user.password} type="password" name="" id="" className="form-control mb-3" placeholder='Enter Password' onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
              </div>
              <div className="d-flex justify-content-between">
                {
                  authStatus ?
                    <button className="btn btn-info" onClick={handleRegistration}>Register</button>
                    :
                    <button className="btn btn-success" onClick={handleLogin}>Login</button>
                }
                <button className="btn btn-link text-info" onClick={changeStatus}>
                  {
                    authStatus ?
                      <>Already a User?</>
                      :
                      <>New User?</>
                  }
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Auth