import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
        <div className="container-fluid p-3 bg-dark">
            <Row>
                <Col>
                    <h3>Project Fair 2024</h3>
                    <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique maxime cum eveniet dolorem doloremque? Expedita, adipisci cupiditate aliquam quae mollitia distinctio, necessitatibus quo nostrum veniam odio non inventore eaque pariatur.</p>
                </Col>
                <Col>
                    <h3>Links</h3>
                    <div className="d-flex flex-column justify-content-around">
                        <Link to={'/'} className='text-light' style={{textDecoration:'none'}}>Landing</Link>
                        <Link to={'/auth'} className='text-light' style={{textDecoration:'none'}}>Login</Link>
                        <Link to={'/db'} className='text-light' style={{textDecoration:'none'}}>Dashboard</Link>
                    </div>
                </Col>
                <Col>
                    <h3>Feedback</h3>
                    <textarea name="" id="" className="form-control my-3"></textarea>
                    <button className="btn btn-info">Send</button>
                </Col>
            </Row>
        </div>
    </>
  )
}

export default Footer