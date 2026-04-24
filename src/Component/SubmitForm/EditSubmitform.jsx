import React from 'react'
import Header from '../../Header'
import Navigation from '../../Navigation'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditSubmitform() {
    const navigate = useNavigate();
    const { submit_id } = useParams();
    const [software_name, setSoftwarename] = useState('');
    const [offical_website, setOfficalWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [developer, setDeveloper] = useState('');
    const [current_version, setCurrentVersion] = useState('');
    const [release_date, setReleaseDate] = useState('');
    const [license_type, setLicenseType] = useState('');
    const [pricing_information, setPricingInformation] = useState('');
    const [platform, setPlatform] = useState('');
    const [key_features, setKeyFeatures] = useState('');
    const [tage, setTage] = useState('');
    const [similar_software_alternatives, setSimilarSoftwareAlternatives] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [relationship_to_software, setRelationshipToSoftware] = useState('');
    const [additional_notes, setAdditionalNotes] = useState('');

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await axios.post(`http://localhost:3001/api/admin/detailsubmitform/${submit_id}`, {});
                setSoftwarename(response.data.data.software_name || "");
                setOfficalWebsite(response.data.data.offical_website || "");
                setDescription(response.data.data.description || "");
                setCategory(response.data.data.category || "");
                setSubcategory(response.data.data.subcategory || "");
                setDeveloper(response.data.data.developer || "");
                setCurrentVersion(response.data.data.current_version || "");
                setReleaseDate(response.data.data.release_date || "");
                setLicenseType(response.data.data.license_type || "");
                setPricingInformation(response.data.data.pricing_information || "");
                setPlatform(response.data.data.platform || "");
                setKeyFeatures(response.data.data.key_features || "");
                setTage(response.data.data.tage || "");
                setSimilarSoftwareAlternatives(response.data.data.similar_software_alternatives || "");
                setName(response.data.data.name || "");
                setEmail(response.data.data.email || "");
                setRelationshipToSoftware(response.data.data.relationship_to_software || "");
                setAdditionalNotes(response.data.data.additional_notes || "");
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch Submitform data");
                console.log(error);
            }
        };
        fetchPage();
    }, [submit_id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/admin/editsubmitform', {
                submit_id,
                software_name,
                offical_website,
                description,
                category,
                subcategory,
                developer,
                current_version,
                release_date,
                license_type,
                pricing_information,
                platform,
                key_features,
                tage,
                similar_software_alternatives,
                name,
                email,
                relationship_to_software,
                additional_notes,
            });
            toast.success(response.data.message);
            setTimeout(() => navigate('/all-submitform'), 2000);
        } catch (error) {
            console.log("Update error:", error.response);
            toast.error(error.response?.data?.message || "Failed to update Submitform");
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Navigation />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div
                            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                        >
                            <h1 className="h2" onClick={() => navigate('/dashboard')}>Dashboard</h1>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="d-flex justify-content-between align-items-center bg-light p-2" >
                                    <div className="col-md-6">
                                        <h4>Edit Submitform</h4>
                                    </div>
                                    <div className="col-md-4 ">
                                        <button className='border rounded bg-primary text-light p-2 ' onClick={() => navigate('/all-submitform')}>All Submitform</button>
                                    </div>
                                </div>

                                <form onSubmit={handleUpdate}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="">Software Name</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Software Name'
                                             type="text" value={software_name || ""}
                                             onChange={(e) => setSoftwarename(e.target.value)}
                                              />
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="">Offical Website</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Offical Website'
                                             type="text" value={offical_website || ""}
                                             onChange={(e) => setOfficalWebsite (e.target.value)}
                                              />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">Description</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Description'
                                             type="text" value={description || ""}
                                             onChange={(e) => setDescription(e.target.value)}
                                              />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">Category</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Category'
                                             type="text" value={category || ""}
                                             onChange={(e) => setCategory(e.target.value)}
                                              />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">Subcategory</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Subcategory'
                                             type="text" value={subcategory || ""}
                                             onChange={(e) => setSubcategory(e.target.value)}
                                              />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">Developer</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Developer'
                                             type="text" value={developer || ""}
                                             onChange={(e) => setDeveloper(e.target.value)}
                                              />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">Current Version</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Current Version'
                                             type="text" value={current_version || ""}
                                             onChange={(e) => setCurrentVersion(e.target.value)}
                                              />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">Release Date</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Release Date'
                                             type="text" value={release_date || ""}
                                             onChange={(e) => setReleaseDate(e.target.value)}
                                              />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">License Type</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter License Type'
                                             type="text" value={license_type || ""}
                                             onChange={(e) => setLicenseType(e.target.value)}
                                              />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="">Pricing Information</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Pricing Information'
                                             type="text" value={pricing_information || ""}
                                             onChange={(e) => setPricingInformation(e.target.value)}
                                              />
                                        </div>


                                        <div className="col-md-4">
                                            <label htmlFor="">Platform</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Platform'
                                             type="text" value={platform || ""}
                                             onChange={(e) => setPlatform(e.target.value)}
                                              />
                                        </div><div className="col-md-4">
                                            <label htmlFor="">Key Features</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Key Features'
                                             type="text" value={key_features || ""}
                                             onChange={(e) => setKeyFeatures(e.target.value)}
                                              />
                                        </div>
                                        
                                        <div className="col-md-4">
                                            <label htmlFor="">Tage</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Tage'
                                             type="text" value={tage || ""}
                                             onChange={(e) => setTage(e.target.value)}
                                              />
                                        </div><div className="col-md-4">
                                            <label htmlFor="">Similar Software Alternatives</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Ente Similar Software Alternativesr'
                                             type="text" value={similar_software_alternatives || ""}
                                             onChange={(e) => setSimilarSoftwareAlternatives(e.target.value)}
                                              />
                                        </div><div className="col-md-4">
                                            <label htmlFor="">Name</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Name'
                                             type="text" value={name || ""}
                                             onChange={(e) => setName(e.target.value)}
                                              />
                                        </div><div className="col-md-4">
                                            <label htmlFor="">Email</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Email'
                                             type="email" value={email || ""}
                                             onChange={(e) => setEmail(e.target.value)}
                                              />
                                        </div><div className="col-md-4">
                                            <label htmlFor="">Relationship To Software</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Relationship To Software<'
                                             type="text" value={relationship_to_software || ""}
                                             onChange={(e) => setRelationshipToSoftware(e.target.value)}
                                              />
                                        </div><div className="col-md-4">
                                            <label htmlFor="">Additional Notes</label><br />
                                            <input className='form-control mt-2'
                                            placeholder='Enter Additional Notes'
                                             type="text" value={additional_notes || ""}
                                             onChange={(e) => setAdditionalNotes(e.target.value)}
                                              />
                                        </div>

                                    </div>
                                    <div className="mt-4">
                                        <button type="submit" className='bg-primary rounded p-2 border text-light'>Edit Submitform</button>
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

export default EditSubmitform
