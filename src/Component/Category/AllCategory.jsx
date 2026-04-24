import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Navigation from '../../Navigation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AllCategory() {
    const navigate = useNavigate();
    const [allCategory, setAllCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/admin/allcategory');
            setAllCategory(response.data.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (category_id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            const response = await axios.post('http://localhost:3001/api/admin/deletecategory', { category_id });
            toast.success(response.data.message);
            setAllCategory(prev => prev.filter(cat => cat.category_id !== category_id));
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
                                        <h4>All Categories</h4>
                                    </div>
                                    <div className="col-md-4  text-end ">
                                        


                                        <button
                                            className='border rounded bg-primary text-light p-2'
                                            onClick={() => navigate('/add-category')}
                                        >
                                            Add New Category
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
                                                <th>Description</th>
                                                <th>Image</th>
                                                <th>Manage</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allCategory.length > 0 ? (
                                                allCategory.map((category, index) => (
                                                    <tr key={category.category_id}>
                                                        <td>{index + 1}</td>
                                                        <td>{category.category_name}</td>
                                                        <td>{category.category_description}</td>
                                                        <td>
                                                            {category.category_image ? (
                                                                <img
                                                                    src={`http://localhost:3001/${category.category_image}`}
                                                                    alt={category.category_name}
                                                                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
                                                                />
                                                            ) : (
                                                                "No Image"
                                                            )}
                                                        </td>
                                                        <td> <button
                                                                className='rounded bg-success p-2 text-light border-0'
                                                                onClick={() => navigate(`/all-subcategory/${category.category_id}`)}
                                                            >
                                                                Subcategory
                                                             </button></td>
                                                       
                                                        <td className='d-flex gap-3 justify-content-center'>
                                                            <button
                                                                className='rounded bg-primary p-2 text-light border-0'
                                                                onClick={() => navigate(`/edit-category/${category.category_id}`)}
                                                            >
                                                                Edit
                                                             </button>
                                                            <button
                                                                className='rounded bg-danger p-2 text-light border-0'
                                                                onClick={() => handleDelete(category.category_id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">No categories found.</td>
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

export default AllCategory;
