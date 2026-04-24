import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setuserName] = useState();
    const [password, setPassword] = useState();
    const navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/admin/login', {
                username,
                password
            });
            sessionStorage.setItem("token", response.data.token);
            toast.success(response.data.message);
        
            setTimeout(() => {
                navigate('/dashboard');
            }, 4000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.log(error);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <form className="w-50 border p-3" onSubmit={handleSubmit}>
                    <div className="text-center">
                        <i><h1>Administration Area</h1></i>
                        <p>Please enter your details to access your account.</p>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setuserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}

            />
        </>
    );
}

export default Login;
