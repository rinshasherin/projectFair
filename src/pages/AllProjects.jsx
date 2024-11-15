import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { searchProjectsApi } from '../services/allApi'


function AllProjects() {

  const [data, setData] = useState([])                    // state for displaying projects

  const [key,setKey]=useState("")                     // state for search

  useEffect(() => {
    getData()
  }, [key])

  const getData = async () => {
    const res = await searchProjectsApi(key)
    if (res.status == 200) {
      setData(res.data)
    }
  }

  console.log(data)

  return (
    <>
      <Header />
      <div className="container-fluid p-3 text-center text-success">
        <div className="d-flex justify-content-between mt-3">
          <h2 style={{fontWeight:'bold'}}>All Projects</h2>
          <input type="text" onChange={(e)=>setKey(e.target.value)} placeholder='Search with languages' className="form-control w-25" style={{height:'50px'}} />
        </div>
        {
          data.length > 0 ?
            <div className='d-flex flex-wrap justify-content-around mt-5'>
              {
                data.map(item => (
                  <ProjectCard project={item} />
                ))
              }
            </div>
            :
            <h3 className="text-danger text-center mt-5">No Projects Available!!</h3>
        }

      </div>
    </>
  )
}

export default AllProjects