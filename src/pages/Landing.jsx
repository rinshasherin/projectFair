import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { allProjectsApi } from '../services/allApi'


function Landing() {

    const [logStatus, setLogStatus] = useState(false)

    const [data, setData] = useState([])                          // state for allProjects

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setLogStatus(true)
        }
        else {
            setLogStatus(false)
        }

        getData()
    }, [])

    const getData = async () => {
        const res = await allProjectsApi()
        if (res.status == 200) {
            setData(res.data)
        }
    }

    console.log(data)


    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <Row>
                    <Col className='d-flex flex-column justify-content-center'>
                        <h2 className='text-light'>Project Fair</h2>
                        <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero reiciendis maxime iusto aliquam excepturi sit culpa asperiores voluptatem ducimus nemo dolorem, facilis velit tempora ipsum quibusdam minus recusandae accusamus. Deserunt!</p>
                        <div className="d-grid">
                            {
                                logStatus ?
                                    <Link className="btn btn-primary" to={'/db'}>Go to Dashboard</Link>
                                    :
                                    <Link to={'/auth'} className='btn btn-info'>Start to Explore</Link>
                            }
                        </div>
                    </Col>
                    <Col>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-illustration-download-in-svg-png-gif-file-formats--website-application-app-solution-software-pack-seo-illustrations-2918517.png?f=webp" alt="" className="img-fluid" />
                    </Col>
                </Row>
            </div>

            <div className='text-center mb-3'>
                <h2 className='text-light mb-4'>Sample Projects</h2>
                {
                    data.length > 0 ?
                        <div className='d-flex justify-content-around'>
                            {
                                data.slice(0,3).map(item=>(
                                    <ProjectCard project={item} />
                                ))
                            }
                        </div>
                        :
                        <h3 className="text-center text-danger">No Projects Available!!</h3>
                }

            </div>

            <div className="text-center mb-4">
                <Link to={'/prjcts'}>View More</Link>
            </div>
        </>
    )
}

export default Landing