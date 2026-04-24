import React from 'react'
import Header from '../../Header'
import Navigation from '../../Navigation'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditFaq() {
  const navigate =useNavigate();
    const { faq_id } = useParams(); // route se id

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('')

 useEffect(() => {
  const fetchPage = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/admin/detailfaq/${faq_id}`,{});
       setQuestion(response.data.date.question || "");
      setAnswer(response.data.date.answer || "");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch faq data");
    }
  };
  fetchPage();
}, [faq_id]);

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/api/admin/editfaq', {
      faq_id,
      question,
      answer
    });
    toast.success(response.data.message);
    setTimeout(() => navigate('/all-faq'), 2000);
  } catch (error) {
    console.log("Update error:", error.response);
    toast.error(error.response?.data?.message || "Failed to update faq");
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
             <h1 class="h2" onClick={()=>navigata('/dashboard')}>Dashboard</h1>
            </div>
            <div className="container">
                            <div className="row">
                                <div className="d-flex justify-content-between align-items-center bg-light p-2" >
                                    <div className="col-md-6">
                                        <h4>Edit Faq</h4>
                                    </div>
                                    <div className="col-md-4 ">
                                        <button className='border rounded bg-primary text-light p-2 ' onClick={() => navigate('/all-faq')}>All Faq</button>
                                    </div>
                                </div>

                                <form onSubmit={handleUpdate}>
                                    <div className="row">

                                        <div className="col-md-4">
                                            <label htmlFor="">Name</label><br />
                                            <input type="text" value={question || ""} onChange={(e) => setQuestion(e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">Title</label><br />
                                            <input type="text" value={answer || ""} onChange={(e) => setAnswer(e.target.value)} />
                                        </div>

                                    </div>

                                    <div className="mt-4">
                                        <button type="submit">Edit faq</button>
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

export default EditFaq
