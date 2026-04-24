import React from 'react'
import Header from '../../Header'
import Navigation from '../../Navigation'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditPage() {
  const navigate =useNavigate();
    const { id } = useParams(); // route se id

  const [pageName, setPageName] = useState('');
  const [pageTitle, setPageTitle] = useState('')

 useEffect(() => {
  const fetchPage = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/admin/pagedetail/${id}`);
      setPageName(response.data.data.page_name);
      setPageTitle(response.data.data.page_title);
      // ✅ Yahan toast hata do
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch page data");
    }
  };
  fetchPage();
}, [id]);

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`http://localhost:3001/api/admin/editpage`, {
      id,
      page_name: pageName,
      page_title: pageTitle
    });
    toast.success(response.data.message); 
    setTimeout(()=>{
      navigate('/all-page');
    },3000)
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update page");
  }
};
  return (
    <>
       <Header/>
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
                                        <h4>Edit Page</h4>
                                    </div>
                                    <div className="col-md-4 ">
                                        <button className='border rounded bg-primary text-light p-2 ' onClick={() => navigate('/all-page')}>All Page</button>
                                    </div>
                                </div>

                                <form onSubmit={handleUpdate}>
                                    <div className="row">

                                        <div className="col-md-4">
                                            <label htmlFor="">Name</label><br />
                                            <input type="text" name="" placeholder='Enter Page Name'  value={pageName} onChange={(e) => setPageName(e.target.value)}  />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">Title</label><br />
                                            <input type="text" name="" placeholder='Enter Page Title' value={pageTitle} onChange={(e) => setPageTitle(e.target.value)}  />
                                        </div>

                                    </div>

                                    <div className="mt-4">
                                        <button type="submit">Edit Page</button>
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

export default EditPage
