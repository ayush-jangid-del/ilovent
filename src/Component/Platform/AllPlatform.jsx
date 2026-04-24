import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Navigation from '../../Navigation'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function AllPlatform() {
  const navigata = useNavigate()
  const [allFaq, setAllFaq] = useState([]);
  const [loading, setLoading] = useState(true);


  const pageList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/allplatform')
      setAllFaq(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Platform");
      setLoading(false);
    }
  }

  useEffect(() => {
    pageList();
  }, [])

  const handleDelete = async (platform_id) => {
  try {
    const response = await axios.post('http://localhost:3001/api/admin/deleteplatform', { platform_id });
    toast.success(response.data.message);
    // Remove deleted page from state
    setAllFaq(prev => prev.filter(page => page.platform_id !== platform_id));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete Platform");
  }
}

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div
              className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
             <h1 className="h2" onClick={()=>navigata('/dashboard')}>Dashboard</h1>
            </div>

            <div className="container">
              <div className="row">
                <div className="d-flex justify-content-between align-items-center bg-light p-2" >
                  <div className="col-md-6">
                    <h4>All Platform</h4>
                  </div>
                  <div className="col-md-4 text-end">
                    <button className='border rounded bg-primary text-light p-2 ' onClick={() => navigata('/add-platform')}>Add New Platform</button>
                  </div>
                </div>
                {loading ? (<p>Lodding...</p>) :
                  (<table className="table table-striped table-bordered table-hover text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>S No.</th>
                        <th>Name</th>
                        <th>Action</th>

                      </tr>
                    </thead>
                    <tbody>

                      {allFaq.map((Platform, index) => (
                        <tr key={Platform.id}>
                          <td>{index + 1}</td>
                          <td>{Platform.name}</td>
                          <td className='d-flex gap-3 justify-content-center'>
                            <button className='rounded bg-primary p-2 text-light border-0' onClick={() => navigata(`/edit-platform/${Platform.platform_id}`)}>Edit</button>
                            <button className='rounded bg-danger p-2 text-light border-0' onClick={() => handleDelete(Platform.platform_id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>)}
              </div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000}/>
    </>
  )
}

export default AllPlatform
