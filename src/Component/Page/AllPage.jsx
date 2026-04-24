import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Navigation from '../../Navigation'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function AllPage() {
  const navigata = useNavigate()
  const [allPage, setAllPage] = useState([]);
  const [loading, setLoading] = useState(true);


  const pageList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/allpage')
      setAllPage(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch pages");
      setLoading(false);
    }
  }

  useEffect(() => {
    pageList();
  }, [])

  const handleDelete = async (id) => {
  try {
    const response = await axios.post('http://localhost:3001/api/admin/deletepage', { id });
    toast.success(response.data.message);
    // Remove deleted page from state
    setAllPage(prev => prev.filter(page => page.id !== id));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete page");
  }
}

  return (
    <>
      <Header />
      <div class="container-fluid">
        <div class="row">
          <Navigation />
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
              <h1 class="h2">Dashboard</h1>
            </div>

            <div className="container">
              <div className="row">
                <div className="d-flex justify-content-between align-items-center bg-light p-2" >
                  <div className="col-md-6">
                    <h4>All Page</h4>
                  </div>
                  <div className="col-md-4 text-end">
                    <button className='border rounded bg-primary text-light p-2 ' onClick={() => navigata('/add-page')}>Add New Page</button>
                  </div>
                </div>
                {loading ? (<p>Lodding...</p>) :
                  (<table className="table table-striped table-bordered table-hover text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>S No.</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Action</th>

                      </tr>
                    </thead>
                    <tbody>

                      {allPage.map((page, index) => (
                        <tr key={page.id}>
                          <td>{index + 1}</td>
                          <td>{page.page_name}</td>
                          <td>{page.page_title}</td>
                          <td className='d-flex gap-3 justify-content-center'>
                            <button className='rounded bg-primary text-light border-0' onClick={() => navigata(`/edit-page/${page.id}`)}>Edit</button>
                            <button className='rounded bg-primary text-light border-0' onClick={() => handleDelete(page.id)}>Delete</button>
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
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default AllPage
