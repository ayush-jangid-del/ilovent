import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import Navigation from '../../Navigation';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function AddSubcategory() {
    const [categories, setCategories] = useState([]);
    const { category_id } = useParams();  
    const [rows, setRows] = useState([
    { subcategoryName: '', subcategoryDescription: '', subcategoryImage: null, previewSrc: '' }
]);
    const navigate = useNavigate();

    // Fetch categories for dropdown
    useEffect(() => {
        axios.get('http://localhost:3001/api/admin/allcategory')
            .then(res => setCategories(res.data.data || []))
            .catch(err => console.log(err));
    }, []);

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

        handleRowChange(index, 'subcategoryImage', file);
    };

    const addRow = () => {
        setRows([...rows, { categoryId: '', subcategoryName: '', subcategoryDescription: '', subcategoryImage: null, previewSrc: '' }]);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        for (let row of rows) {
            if (!row.subcategoryName || !row.subcategoryDescription) {
                toast.error("Please fill all fields in every row");
                return;
            }

            const formData = new FormData();
            formData.append('category_id', Number(category_id)); // 👈 URL se
            formData.append('subcategory_name', row.subcategoryName);
            formData.append('subcategory_description', row.subcategoryDescription);
            if (row.subcategoryImage) formData.append('subcategory_image', row.subcategoryImage);

            await axios.post(
                `http://localhost:3001/api/admin/addsubcategory/${category_id}`, // 👈 route me bhi param use
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
        }

        toast.success("Subcategories added successfully");
        setRows([{ subcategoryName: '', subcategoryDescription: '', subcategoryImage: null, previewSrc: '' }]);
        setTimeout(() => navigate(`/all-subcategory/${category_id}`), 2000);

    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add subcategories");
        console.log(error);
    }
};
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row" style={{ minHeight: '100vh' }}>
                    <Navigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ overflowY: 'auto', paddingTop: '60px' }}>
                        <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                        </div>

                        <div className="container">
                            <div className="row mb-3">
                                <div className="col d-flex justify-content-between align-items-center bg-light p-2">
                                    <h4>Add Subcategory</h4>
                                    <button className='border rounded bg-primary text-light p-2' onClick={() => navigate(`/all-subcategory/${category_id}`)}>
                                        All Subcategories
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {rows.map((row, index) => (
                                    <div key={index} className="row mb-3 border p-2 rounded">

                                        <div className="col-md-3 mb-2">
                                            <label>Subcategory Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={row.subcategoryName}
                                                onChange={(e) => handleRowChange(index, 'subcategoryName', e.target.value)}
                                            />
                                        </div>

                                        <div className="col-md-3 mb-2">
                                            <label>Description</label>
                                            <textarea
                                                className="form-control"
                                                value={row.subcategoryDescription}
                                                onChange={(e) => handleRowChange(index, 'subcategoryDescription', e.target.value)}
                                            />
                                        </div>

                                        <div className="col-md-3 mb-2">
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
                                <button className='bg-primary rounded p-2 border text-light' type="submit">Add Subcategory</button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
}

export default AddSubcategory;
