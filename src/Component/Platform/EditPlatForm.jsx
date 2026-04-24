import React from 'react'
import Header from '../../Header'
import Navigation from '../../Navigation'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditPlatForm() {
  const navigate =useNavigate();
  const { platform_id } = useParams(); 
  const [name, setName] = useState('');

 useEffect(() => {
  const fetchPage = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/admin/detailplatform/${platform_id}`,{});
       setName(response.data.date.name || "");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch platform data");
    }
  };
  fetchPage();
}, [platform_id]);

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/api/admin/editplatform', {
      platform_id,
      name,
    });
    toast.success(response.data.message);
    setTimeout(() => navigate('/all-platform'), 2000);
  } catch (error) {
    console.log("Update error:", error.response);
    toast.error(error.response?.data?.message || "Failed to update Platform");
  }
};

  return (
    <>
    <Header/>
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div
              className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
             <h1 className="h2" onClick={()=>navigate('/dashboard')}>Dashboard</h1>
            </div>
            <div className="container">
                            <div className="row">
                                <div className="d-flex justify-content-between align-items-center bg-light p-2" >
                                    <div className="col-md-6">
                                        <h4>Edit Platform</h4>
                                    </div>
                                    <div className="col-md-4 ">
                                        <button className='border rounded bg-primary text-light p-2 ' onClick={() => navigate('/all-platform')}>All Platform</button>
                                    </div>
                                </div>

                                <form onSubmit={handleUpdate}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="">Name</label><br />
                                            <input className='form-control mt-2' type="text" value={name || ""} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button type="submit" className='bg-primary rounded p-2 border text-light'>Edit Platform</button>
                                    </div>

                                </form>
                            </div>
                        </div>
          </main>
        </div>
      </div>
    <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default EditPlatForm
