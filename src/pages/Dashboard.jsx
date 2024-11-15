import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { getProjectsApi, deleteProjectApi } from '../services/allApi'
import { responseContext } from '../contextapi/ContextProvider'
import { toast } from 'react-toastify'
import Profile from '../components/Profile'


function Dashboard() {


  const [uname, setUname] = useState("")
  const [projects, setProjects] = useState([])

  const { response } = useContext(responseContext)


  const getProject = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getProjectsApi(header)
    console.log(res)
    if (res.status == 200) {
      setProjects(res.data)
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setUname(sessionStorage.getItem('user'))
    }
    getProject()
  }, [response])


  const handleDelete = async (id) => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }

    const res = await deleteProjectApi(id, header)
    console.log(res)
    if (res.status == 200) {
      getProject()
    }
    else {
      toast.warning("Something Went Wrong!!")
      console.log(res)
    }
  }


  return (
    <>
      <Header />
      <div className="container-fluid p-3">
        <h1 className="text-center my-3">Welcome <span className="text-danger">{uname}...</span></h1>
        <Row>
          <Col md={8} sm={12}>
            <h3>Projects</h3>
            <div className="border border-3 border-dark shadow p-2">
              <Add />
              <div className="my-2">
                {
                  projects.length > 0 ?
                    projects.map((item) => (
                      <div className="border border-2 border-info shadow mb-3 d-flex justify-content-between p-2">
                        <h5>{item?.title}</h5>
                        <div>
                          <a href={item?.github} className="me-3"><i className="fa-brands fa-github fa-xl" style={{ color: "#32aad2", }} /></a>
                          <Edit project={item} />
                          <button className="btn" onClick={() => handleDelete(item._id)}>
                            <i className="fa-solid fa-trash fa-xl" style={{ color: "#b81919", }} />
                          </button>
                        </div>
                      </div>
                    ))

                    :
                    <h4 className='text-center text-danger'>No Projects</h4>
                }

              </div>
            </div>
          </Col>
          <Col md={4} sm={12}>

            <Profile />
            
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard