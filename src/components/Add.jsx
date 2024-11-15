import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProjectApi } from '../services/allApi';
import { responseContext } from '../contextapi/ContextProvider';

function Add() {

    const [show, setShow] = useState(false);
    const [project, setProject] = useState({
        title: "", description: "", languages: "", github: "", demo: "", image: ""
    })
    const [preview, setPreview] = useState("")

    const { setResponse } = useContext(responseContext)

    const handleProjectAdd = async () => {
        console.log(project)
        const { title, description, languages, github, demo, image } = project
        if (!title || !description || !languages || !github || !demo || !image) {
            toast.warning("Enter valid inputs!!")
        }
        else {
            const fd = new FormData()
            fd.append('title', title)
            fd.append('description', description)
            fd.append('languages', languages)
            fd.append('github', github)
            fd.append('demo', demo)
            fd.append('image', image)

            const header = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
            const res = await addProjectApi(fd, header)
            console.log(res)
            if (res.status == 200) {
                toast.success("Project Added Successfully!!")
                handleClose()
                setResponse(res)
            }
        }
    }

    useEffect(() => {

        if (project.image) {
            setPreview(URL.createObjectURL(project.image))
        }
        else {
            setPreview("")
        }

    }, [project.image])

    const handleClose = () => {
        setShow(false)
        setProject({
            title: "", description: "", languages: "", github: "", demo: "", image: ""
        })
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Project
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>
                                <input type="file" name="" id="" style={{ display: 'none' }} onChange={(e) => { setProject({ ...project, image: e.target.files[0] }) }} />
                                <img src={preview ? preview : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png"} alt="" className="img-fluid" />
                            </label>
                        </Col>
                        <Col>
                            <input type="text" className="form-control mb-1" placeholder='Title' onChange={(e) => { setProject({ ...project, title: e.target.value }) }} />
                            <input type="text" className="form-control mb-1" placeholder='Description' onChange={(e) => { setProject({ ...project, description: e.target.value }) }} />
                            <input type="text" className="form-control mb-1" placeholder='Languages Used' onChange={(e) => { setProject({ ...project, languages: e.target.value }) }} />
                            <input type="text" className="form-control mb-1" placeholder='Git Repository Link' onChange={(e) => { setProject({ ...project, github: e.target.value }) }} />
                            <input type="text" className="form-control mb-1" placeholder='Demo Link' onChange={(e) => { setProject({ ...project, demo: e.target.value }) }} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleProjectAdd}>Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add