import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Navigation from '../../Navigation'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function AllContact() {
  const navigata = useNavigate()
  const [allContact, setAllContact] = useState([]
    
  );
  const [loading, setLoading] = useState(true);


  const contactList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/allcontact')
      console.log(response.data);
      setAllContact(response.data.data);
      
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Contact");
      setLoading(false);
    }
  }

  useEffect(() => {
    contactList();
  }, [])


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
                    <h4>All Contact</h4>
                  </div>
                  <div className="col-md-4 text-end">
                  </div>
                </div>
                {loading ? (<p>Lodding...</p>) :
                  (<table className="table table-striped table-bordered table-hover text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>S No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Category</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    <tbody>

                      {Array.isArray(allContact) && allContact.map((contact, index) => (
                        <tr key={contact.id}>
                          <td>{index + 1}</td>
                          <td>{contact.name}</td>
                          <td>{contact.email}</td>
                          <td>{contact.category}</td>
                          <td>{contact.message}</td>

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

export default AllContact
