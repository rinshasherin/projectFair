import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import { updateProjectApi } from '../services/allApi';
import { responseContext } from '../contextapi/ContextProvider';


function Edit({ project }) {

    const [show, setShow] = useState(false);

    const [edit, setEdit] = useState({
        title: "", description: "", languages: "", github: "", demo: "", image: ""
    })

    const [preview, setPreview] = useState("")

    const { setResponse } = useContext(responseContext)


    useEffect(() => {                    // existing datas edit modal il loading phase l display cheyyan
        setEdit({ ...project })
    }, [])

    useEffect(() => {
        if (edit.image.type) {
            setPreview(URL.createObjectURL(edit.image))
        }
        else {
            setPreview("")
        }
    }, [edit.image])


    const handleEdit = async () => {
        console.log(edit)
        const { title, description, languages, github, demo, image } = edit
        if (!title || !description || !languages || !github || !demo || !image) {
            toast.warning("Invalid inputs!!")
        }
        else {
            if (edit.image.type) {
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

                const res = await updateProjectApi(edit._id, header, fd)
                console.log(res)
                if (res.status == 200) {
                    toast.success("Project details updated!!")
                    handleClose()
                    setResponse(res)
                }
                else {
                    toast.error("Updation failed!!")
                }
            }
            else {
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }

                const res = await updateProjectApi(edit._id, header, edit)
                console.log((res))
                if (res.status == 200) {
                    toast.success("Project details updated!!")
                    handleClose()
                    setResponse(res)
                }
                else {
                    toast.error("Updation failed!!")
                }
            }

        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="btn" onClick={handleShow}>
                <i className="fa-regular fa-pen-to-square fa-xl" style={{ color: "#ababab", }} />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>
                                <input type="file" name="" id="" style={{ display: 'none' }} onChange={(e) => setEdit({ ...edit, image: e.target.files[0] })} />
                                <img src={preview ? preview : `${base_url}/uploads/${edit.image}`} alt="" className="img-fluid" />
                            </label>
                        </Col>
                        <Col>
                            <input type="text" defaultValue={edit.title} className="form-control mb-1" placeholder='Title' onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
                            <input type="text" defaultValue={edit.description} className="form-control mb-1" placeholder='Description' onChange={(e) => setEdit({ ...edit, description: e.target.value })} />
                            <input type="text" defaultValue={edit.languages} className="form-control mb-1" placeholder='Languages Used' onChange={(e) => setEdit({ ...edit, languages: e.target.value })} />
                            <input type="text" defaultValue={edit.github} className="form-control mb-1" placeholder='Git Repository Link' onChange={(e) => setEdit({ ...edit, github: e.target.value })} />
                            <input type="text" defaultValue={edit.demo} className="form-control mb-1" placeholder='Demo Link' onChange={(e) => setEdit({ ...edit, demo: e.target.value })} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleEdit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default Edit