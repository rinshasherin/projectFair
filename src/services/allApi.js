import base_url from "./base_url";
// import axios from "axios";
import commonApi from "./commonApi";


export const registerApi = async (data) => {
    return await commonApi(`${base_url}/reg`, "POST", "", data)
}

export const loginApi = async (data) => {
    return await commonApi(`${base_url}/log`, "POST", "", data)
}

export const addProjectApi = async (data, header) => {
    return await commonApi(`${base_url}/addproject`, "POST", header, data)
}

export const getProjectsApi = async (header) => {
    return await commonApi(`${base_url}/projects`, "GET", header, "")
}

export const deleteProjectApi = async (id, header) => {
    return await commonApi(`${base_url}/deleteproject/${id}`, "DELETE", header, {})                           // delete request il data illenkil pakaram '{}' aan kodukkandath,(reason : delete nakath oru body exist cheyyunnund , so ath empty akkanamenki empty object aan kodukkendath) (normally "" (empty string) aan kodukkunnath)
}

export const updateProjectApi = async (id, header, data) => {
    return await commonApi(`${base_url}/updateproject/${id}`, "PUT", header, data)
}

export const updateProfileApi = async (header, data) => {
    return await commonApi(`${base_url}/updateprofile`, "PUT", header, data)
}

export const allProjectsApi = async () => {
    return await commonApi(`${base_url}/allprojects`, "GET", "", "")
}

export const searchProjectsApi = async (keyword) => {
    return await commonApi(`${base_url}/search?search=${keyword}`, "GET", "", "")
}