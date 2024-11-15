import React, { useContext, useEffect, useState } from 'react'
import base_url from '../services/base_url'
import { updateProfileApi } from '../services/allApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { logContext } from '../contextapi/AuthContext'


function Profile() {

    const [view, setView] = useState(false)

    const [details, setDetails] = useState({                           // state for viewing username when open profile upadation
        username: "", github: "", linkedin: "", profile: ""
    })

    const [preview, setPreview] = useState("")

    const nav = useNavigate()

    const {setLogStatus}=useContext(logContext)

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setDetails({
                username: sessionStorage.getItem('user'),
                github: sessionStorage.getItem('github'),
                linkedin: sessionStorage.getItem('linkedin'),
                profile: sessionStorage.getItem('profile')
            })
        }
    }, [])

    useEffect(() => {
        if (details.profile.type) {
            setPreview(URL.createObjectURL(details.profile))
        }
        else {
            setPreview("")
        }
    }, [details.profile])

    const changeView = () => {
        setView(!view)
    }

    const handleUpdate = async () => {
        console.log(details)
        const { username, github, linkedin, profile } = details
        if (!username || !github || !linkedin || !profile) {
            toast.warning("Enter valid inputs!!")
        }
        else {
            if (profile.type) {
                const fd = new FormData()
                fd.append('username', username)
                fd.append('github', github)
                fd.append('linkedin', linkedin)
                fd.append('profile', profile)

                const header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }

                const result = await updateProfileApi(header, fd)
                if (result.status == 200) {
                    toast.success("Profile updation successfull!!")
                    nav('/auth')
                    setLogStatus(false)
                    sessionStorage.clear()
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

                const result = await updateProfileApi(header, details)
                if (result.status == 200) {
                    toast.success("Profile updation successfull!!")
                    nav('/auth')
                    setLogStatus(false)
                    sessionStorage.clear()
                }
                else {
                    toast.error("Updation failed!!")
                }
            }
        }
    }

    return (
        <>
            <div className="w-100 p-2 border mt-3 border-3">
                <div className="d-flex justify-content-between">
                    <h4>Profile Updation</h4>
                    <button className="btn" onClick={changeView}>
                        {
                            view ?
                                <i className="fa-solid fa-caret-up" style={{ color: 'white' }} />
                                :
                                <i className="fa-solid fa-caret-down" style={{ color: 'white' }} />
                        }
                    </button>
                </div>
                {
                    view &&
                    <div>
                        <label>
                            <input type="file" name="" id="" style={{ display: 'none' }} onChange={(e) => setDetails({ ...details, profile: e.target.files[0] })} />
                            <img src={preview ? preview : details.profile !== '' ? `${base_url}/uploads/${details.profile}` : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"} width={'300px'} alt="" className="img-fluid" />
                        </label>
                        <input type="text" defaultValue={details.username} className="form-control mb-3" placeholder='Username' onChange={(e) => setDetails({ ...details, username: e.target.value })} />
                        <input type="text" defaultValue={details.github} className="form-control mb-3" placeholder='GitHub Link' onChange={(e) => setDetails({ ...details, github: e.target.value })} />
                        <input type="text" defaultValue={details.linkedin} className="form-control mb-3" placeholder='LinkedIn Link' onChange={(e) => setDetails({ ...details, linkedin: e.target.value })} />
                        <div className="d-flex justify-content-end">
                            <button className="btn btn me-2" style={{ backgroundColor: 'red', color: 'white' }} >Cancel</button>
                            <button className="btn btn " style={{ backgroundColor: 'green', color: 'white' }} onClick={handleUpdate} >Update</button>
                        </div>
                    </div>
                }
            </div>

        </>
    )
}


export default Profile