import React, { useState } from 'react'
import Header from '../../Header'
import Navigation from '../../Navigation'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


function AddPage() {
    const [pageTitle, setPageTitle] = useState();
    const [pageName, setPageName] = useState();
    const navigata =useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3001/api/admin/addpage', {
            page_name: pageName,
            page_title: pageTitle
        });
        toast.success(response.data.message);
         setPageName('');
         setPageTitle('');  
    } catch (error) {
        if (error.response) {
        
            toast.error(error.response?.data?.message || "Something went wrong");
        } else {
            
            toast.error("Network Error or Server did not respond");
        }   
        console.log(error);
    }
};

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
                                        <h4>Add Page</h4>
                                    </div>
                                    <div className="col-md-4 ">
                                        <button className='border rounded bg-primary text-light p-2 ' onClick={() => navigata('/all-page')}>All Page</button>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        <div className="col-md-4">
                                            <label htmlFor="">Name</label><br />
                                            <input type="text" name="" placeholder='Enter Page Name' value={pageName} onChange={(e) => setPageName(e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">Title</label><br />
                                            <input type="text" name="" placeholder='Enter Page Title' value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
                                        </div>

                                    </div>

                                    <div className="mt-4">
                                        <button type="submit">Add Page</button>
                                    </div>

                                </form>
                            </div>
                        </div>


                    </main>
                </div>
            </div>
             <ToastContainer
                position="top-center"
                autoClose={3000}

            />
        </>
    )
}

export default AddPage
