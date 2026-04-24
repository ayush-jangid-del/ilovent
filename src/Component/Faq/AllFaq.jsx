import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Navigation from '../../Navigation'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function AllFaq() {
  const navigata = useNavigate()
  const [allFaq, setAllFaq] = useState([]);
  const [loading, setLoading] = useState(true);


  const pageList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/allfaq')
      setAllFaq(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch faq");
      setLoading(false);
    }
  }

  useEffect(() => {
    pageList();
  }, [])

  const handleDelete = async (faq_id) => {
  try {
    const response = await axios.post('http://localhost:3001/api/admin/deletefaq', { faq_id });
    toast.success(response.data.message);
    // Remove deleted page from state
    setAllFaq(prev => prev.filter(page => page.faq_id !== faq_id));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete faq");
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
             <h1 class="h2" onClick={()=>navigata('/dashboard')}>Dashboard</h1>
            </div>

            <div className="container">
              <div className="row">
                <div className="d-flex justify-content-between align-items-center bg-light p-2" >
                  <div className="col-md-6">
                    <h4>All Faq</h4>
                  </div>
                  <div className="col-md-4 text-end">
                    <button className='border rounded bg-primary text-light p-2 ' onClick={() => navigata('/add-faq')}>Add New Faq</button>
                  </div>
                </div>
                {loading ? (<p>Lodding...</p>) :
                  (<table className="table table-striped table-bordered table-hover text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>S No.</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Action</th>

                      </tr>
                    </thead>
                    <tbody>

                      {allFaq.map((faq, index) => (
                        <tr key={faq.id}>
                          <td>{index + 1}</td>
                          <td>{faq.question}</td>
                          <td>{faq.answer}</td>
                          <td className='d-flex gap-3 justify-content-center'>
                            <button className='rounded bg-primary text-light border-0' onClick={() => navigata(`/edit-faq/${faq.faq_id}`)}>Edit</button>
                            <button className='rounded bg-primary text-light border-0' onClick={() => handleDelete(faq.faq_id)}>Delete</button>
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

export default AllFaq
