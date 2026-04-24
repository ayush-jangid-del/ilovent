import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Navigation from '../../Navigation';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function EditSubcategory() {
    const navigate = useNavigate();
    const { category_id, subcategory_id } = useParams(); // URL se category_id aur subcategory_id
const [categoryId, setCategoryId] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');
    const [subcategoryDescription, setSubcategoryDescription] = useState('');
    const [previewSrc, setPreviewSrc] = useState("");
    const [subcategoryImage, setSubcategoryImage] = useState(null);

    // Fetch subcategory details
  useEffect(() => {
    const fetchSubcategory = async () => {
        try {
            const response = await axios.post(
                `http://localhost:3001/api/admin/subcategorydetail/${subcategory_id}`
            );
            const data = response.data.data;

            setSubcategoryName(data.subcategory_name || "");
            setSubcategoryDescription(data.subcategory_description || "");
            setCategoryId(data.category_id || ""); // ✅ ab error nahi aayega
            setPreviewSrc(data.subcategory_image ? `http://localhost:3001/${data.subcategory_image}` : "");
        } catch (error) {
            console.error("Fetch Subcategory Error:", error);
            toast.error(error.response?.data?.message || "Failed to fetch subcategory data");
        }
    };
    fetchSubcategory();
}, [subcategory_id]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSubcategoryImage(file);

        const reader = new FileReader();
        reader.onloadend = () => setPreviewSrc(reader.result);
        reader.readAsDataURL(file);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("subcategory_id", subcategory_id);
            formData.append("category_id", categoryId); // URL param
            formData.append("subcategory_name", subcategoryName);
            formData.append("subcategory_description", subcategoryDescription);

            if (subcategoryImage) {
                formData.append("subcategory_image", subcategoryImage);
            }

            const response = await axios.post(
                "http://localhost:3001/api/admin/editsubcategory",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            toast.success(response.data.message);
            setTimeout(() => navigate(`/all-subcategory/${categoryId}`), 1500);
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to update Subcategory");
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="d-flex justify-content-between align-items-center bg-light p-2 mb-3">
                                    <div className="col-md-6">
                                        <h4>Edit Subcategory</h4>
                                    </div>
                                    <div className="col-md-4 text-end">
                                        <button className='border rounded bg-primary text-light p-2' onClick={() => navigate(`/all-subcategory/${categoryId}`)}>All Subcategories</button>
                                    </div>
                                </div>

                                <form onSubmit={handleUpdate}>
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label>Subcategory Name</label>
                                            <input
                                                type="text"
                                                className='form-control'
                                                value={subcategoryName}
                                                onChange={(e) => setSubcategoryName(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label>Description</label>
                                            <textarea
                                                className='form-control'
                                                value={subcategoryDescription}
                                                onChange={(e) => setSubcategoryDescription(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-md-4 mb-3">
                                            <label>Image</label><br />
                                            {previewSrc && (
                                                <img
                                                    src={previewSrc}
                                                    alt="Subcategory"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "10px" }}
                                                />
                                            )}
                                            <input
                                                type="file"
                                                className='form-control'
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button className='bg-primary rounded p-2 border text-light' type="submit">Update Subcategory</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
}

export default EditSubcategory;
