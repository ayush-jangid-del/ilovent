import React, { useState } from 'react';
import Header from '../../Header';
import Navigation from '../../Navigation';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function AddCategory() {
    const [rows, setRows] = useState([
        { categoryName: '', categoryDescription: '', categoryImage: null, previewSrc: '' }
    ]);
    const navigate = useNavigate();

    const handleRowChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;    
        setRows(newRows);
    };

    const handleImageChange = (index, e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => handleRowChange(index, 'previewSrc', reader.result);
        reader.readAsDataURL(file);

        handleRowChange(index, 'categoryImage', file);
    };

    const addRow = () => {
        setRows([...rows, { categoryName: '', categoryDescription: '', categoryImage: null, previewSrc: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            for (let row of rows) {
                if (!row.categoryName || !row.categoryDescription) {
                    toast.error("Please fill all fields in every row");
                    return;
                }

                const formData = new FormData();
                formData.append('category_name', row.categoryName);
                formData.append('category_description', row.categoryDescription);
                if (row.categoryImage) formData.append('category_image', row.categoryImage);

                await axios.post(
                    'http://localhost:3001/api/admin/addcategory',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
            }

            toast.success("Categories added successfully");
            setRows([{ categoryName: '', categoryDescription: '', categoryImage: null, previewSrc: '' }]);
            setTimeout(() => navigate("/all-category"), 2000);

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add categories");
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ overflowY: 'auto', paddingTop: '60px' }}>
                        <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2" onClick={()=>navigate('/dashboard')}>Dashboard</h1>
                        </div>

                        <div className="container">
                            <div className="row mb-3">
                                <div className="col d-flex justify-content-between align-items-center bg-light p-2">
                                    <h4>Add Category</h4>
                                    <button className='border rounded bg-primary text-light p-2' onClick={() => navigate('/all-category')}>
                                        All Categories
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {rows.map((row, index) => (
                                    <div key={index} className="row mb-3 border p-2 rounded">
                                        <div className="col-md-4 mb-2">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Category Name"
                                                value={row.categoryName}
                                                onChange={(e) => handleRowChange(index, 'categoryName', e.target.value)}
                                            />
                                        </div>

                                        <div className="col-md-4 mb-2">
                                            <label>Description</label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Enter Category Description"
                                                value={row.categoryDescription}
                                                onChange={(e) => handleRowChange(index, 'categoryDescription', e.target.value)}
                                            />
                                        </div>

                                        <div className="col-md-4 mb-2">
                                            <label>Image</label><br />
                                            {row.previewSrc && (
                                                <img
                                                    src={row.previewSrc}
                                                    alt="Preview"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "10px" }}
                                                />
                                            )}
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(index, e)}
                                            />
                                        </div>
                                    </div>
                                ))}

                                <button type="button" className="btn btn-success mb-3" onClick={addRow}>+ Add More</button>
                                <br />
                                <button className='bg-primary rounded p-2 border text-light' type="submit">Add Category</button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
}

export default AddCategory;
