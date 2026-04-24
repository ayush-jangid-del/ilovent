import React from 'react'
import Header from '../../Header'
import Navigation from '../../Navigation'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditCategory() {
    const navigate = useNavigate();
    const { category_id } = useParams(); // route se id

    const [pageName, setPageName] = useState('');
    const [pageTitle, setPageTitle] = useState('')
    const [previewSrc, setPreviewSrc] = useState("");
    const [categoryImage, setCategoryImage] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:3001/api/admin/categorydetail/${category_id}`
                );

                const data = response.data.data;

                setPageName(data.category_name || "");
                setPageTitle(data.category_description || "");
                setPreviewSrc(data.category_image || ""); // backend path
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch page data");
            }
        };
        fetchPage();
    }, [category_id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setCategoryImage(file);

        const reader = new FileReader();
        reader.onloadend = () => setPreviewSrc(reader.result);
        reader.readAsDataURL(file);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("category_id", category_id);
            formData.append("category_name", pageName);
            formData.append("category_description", pageTitle);

            if (categoryImage) {
                formData.append("category_image", categoryImage); // image file
            }

            const response = await axios.post(
                "http://localhost:3001/api/admin/editcategory",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            toast.success(response.data.message);
            setTimeout(() => navigate("/all-category"), 2000);
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to update Category");
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
                                        <h4>Edit Category</h4>
                                    </div>
                                    <div className="col-md-4 ">
                                        <button className='border rounded bg-primary text-light p-2 ' onClick={() => navigate('/all-category')}>All Category</button>
                                    </div>
                                </div>

                                <form onSubmit={handleUpdate}>
                                    <div className="row">

                                        <div className="col-md-4">
                                            <label htmlFor="">Name</label><br />
                                            <input className='form-control' type="text" name="" placeholder='Enter Page Name' value={pageName} onChange={(e) => setPageName(e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">Title</label><br />

                                            <textarea className='form-control' value={pageTitle} onChange={(e) => setPageTitle(e.target.value)}>{pageTitle}</textarea>
                                        </div>

                                        <div className="col-md-4">
                                            <label>Image</label><br />
                                            {previewSrc && (
                                                <img
                                                    src={previewSrc.startsWith("data:") ? previewSrc : `http://localhost:3001/${previewSrc}`}
                                                    alt="Category"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "10px" }}
                                                />
                                            )}   <input className='form-control'
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </div>

                                    </div>

                                    <div className="mt-4">
                                        <button className='bg-primary rounded p-2 border text-light' type="submit">Edit Category</button>
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

export default EditCategory
