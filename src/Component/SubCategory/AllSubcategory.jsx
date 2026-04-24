import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Navigation from '../../Navigation';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AllSubcategory() {
    const navigate = useNavigate();
    const [allCategory, setAllCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const {category_id} = useParams();


    const fetchCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/admin/allsubcategory/${category_id}`);
            console.log(response.data);
            
            setAllCategory(response.data.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [category_id]);

    const handleDelete = async (subcategory_id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            const response = await axios.post('http://localhost:3001/api/admin/deletesubcategory', { subcategory_id });
            toast.success(response.data.message);
            setAllCategory(prev => prev.filter(cat => cat.subcategory_id !== subcategory_id));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete category");
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
                                        <h4>All SubCategories</h4>
                                    </div>
                                    <div className="col-md-4 text-end">
                                        <button
                                            className='border rounded bg-primary text-light p-2'
                                            onClick={() => navigate(`/add-subcategory/${category_id}`)}
                                        >
                                            Add New SubCategory
                                        </button>
                                    </div>
                                </div>

                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <table className="table table-striped table-bordered table-hover text-center">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>S No.</th>
                                                <th>Name</th>
                                                <th>category Name</th>
                                                <th>Description</th>
                                                <th>Image</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allCategory.length > 0 ? (
                                                allCategory.map((category, index) => (
                                                    <tr key={category.category_id}>
                                                        <td>{index + 1}</td>
                                                        <td>{category.subcategory_name}</td>
                                                        <td>{category.category ? category.category.category_name : " "}</td>
                                                        <td>{category.subcategory_description}</td>
                                                        <td>
                                                            {category.subcategory_image ? (
                                                                <img
                                                                    src={`http://localhost:3001/${category.subcategory_image}`}
                                                                    alt="Subcategory"
                                                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                                />
                                                            ) : (
                                                                "No Image"
                                                            )}
                                                        </td>
                                                        <td className='d-flex gap-3 justify-content-center'>
                                                            <button
                                                                className='rounded bg-primary text-light border-0'
                                                                onClick={() => navigate(`/edit-subcategory/${category.subcategory_id}`)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className='rounded bg-danger text-light border-0'
                                                                onClick={() => handleDelete(category.subcategory_id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">No subcategories found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
}

export default AllSubcategory;
