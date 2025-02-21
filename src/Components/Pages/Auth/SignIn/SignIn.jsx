import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { _SignIn } from "../../../Functions/Auth";

import { useDispatch } from "react-redux";
import { loggedInUsers } from "../../../Reducer/userSlice";

import Modal from '../../../Style/Utility/Modal/Modal'; // Import the Modal component
//CSS
import '../../../Style/Auth/SignIn/SignIn.css';
import '../../../Style/Utility/Modal/Modal.css'

function SignIn() {
    //Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    
    const { username, password } = formData;
    
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (username === '' || password === '') {
            const errorMessage = 'Require username and password'
            setModalTitle('Error');
            setModalMessage(errorMessage);
            setModalOpen(true);
            setLoading(false);
            return;
        }

        const value = { username, password };
        _SignIn(value)
            .then(response => {
                setLoading(false);
                    console.log(response)
                    const userData  =  {
                        id: response.data.payload.user.id,
                        username: response.data.payload.user.username,
                        email : response.data.payload.user.email,
                        phone : response.data.payload.user.phone,
                        token: response.data.token,
                        role: response.data.payload.user.role,
                        file : response.data.payload.user.file,
                        cart : response.data.payload.user.cart,
                        problemstatus : response.data.payload.user.problemstatus
                    }
                    localStorage.setItem('token', response.data.token);
                    //sessionStorage.setItem('token', response.data.token); // Store token in session storage
                    roleBaseRedirect(response.data.payload.user.role);
                    dispatch(loggedInUsers(userData));
                })
                .catch(err => {
                const errorMessage = err.response?.data || 'An error occurred. Please try again.';
                setModalTitle('Error');
                setModalMessage(errorMessage);
                setModalOpen(true);
                setLoading(false)
            });
    };

    const roleBaseRedirect = (role) => {
        if (role === 'admin') {
            navigate('/Adminitratordashboard');
        } else {
            navigate('/UserPage');
        }   
    };

    return (
                <div>
                    <form onSubmit={onSubmit}>
                        <div className="signin-container">
                            <div>
                                <label  className="signin-title">SIGN IN WITH USERNAME</label>
                                <input className="signin-username-input"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    maxLength={16}
                                    autoFocus
                                    onChange={onChange}
                                    aria-label="Username"
                                    autoComplete="new-username" // or "username"
                                />
                            </div>
                            <div>
                                <label className="signin-label">PASSWORD</label>
                                <input className="signin-password-input"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={onChange}
                                    aria-label="Password"
                                    autoComplete="off" // or "password"
                                />
                            </div>

                            <div className="forgotpassword-link">
                                <Link className="signin-link" to="/ForgotPassword">Forgot Password</Link>
                            </div>
                            
                            <div className="signin-button-container"> 
                                <button className="signin-button" disabled={loading}>Sign in</button>
                            </div>

                            <div>
                                <Link className="signin-link" to="/SignUpVerifyPhone">Sign Up</Link>
                            </div>
                        </div>
                    </form>
                            <Modal 
                                isOpen={modalOpen} 
                                onClose={() => setModalOpen(false)} 
                                title={modalTitle} 
                                message={modalMessage} 
                            />
                </div>
    );
}

export default SignIn;





/*import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { _SignIn } from "../../../Functions/Auth";

import { useDispatch } from "react-redux";
import { loggedInUsers } from "../../../Reducer/userSlice";

import Modal from '../../../Style/Utility/Modal/Modal'; // Import the Modal component
//CSS
import '../../../Style/Auth/SignIn/SignIn.css';
import '../../../Style/Utility/Modal/Modal.css'

function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    
    const { username, password } = formData;
    
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null); // Clear error on input change
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (username === '' || password === '') {
            setError('Please fill in...');
            setLoading(false);
            return;
        }

        const value = { username, password };
        _SignIn(value)
            .then(response => {
                setLoading(false);
                    console.log(response)
                    const userData  =  {
                        id: response.data.payload.user.id,
                        username: response.data.payload.user.username,
                        email : response.data.payload.user.email,
                        token: response.data.token,
                        role: response.data.payload.user.role,
                        file : response.data.payload.user.file,
                        cart : response.data.payload.user.cart
                    }
                    localStorage.setItem('token', response.data.token);
                    roleBaseRedirect(response.data.payload.user.role);
                    dispatch(loggedInUsers(userData));
                })
                .catch(err => {
                const errorMessage = err.response?.data || 'An error occurred. Please try again.';
                setModalTitle('Error');
                setModalMessage(errorMessage);
                setModalOpen(true);
                setLoading(false)
            });
    };

    const roleBaseRedirect = (role) => {
        if (role === 'admin') {
            navigate('/Adminitratordashboard');
        } else {
            navigate('/UserPage');
        }   
    };

    return (
                <div>
                    <form onSubmit={onSubmit}>
                        <div className="signin-container">
                            <div>
                                <label  className="signin-title">SIGN IN WITH USERNAME</label>
                                <input className="signin-username-input"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    maxLength={16}
                                    autoFocus
                                    onChange={onChange}
                                    aria-label="Username"
                                    autoComplete="new-username" // or "username"
                                />
                            </div>
                            <div>
                                <label className="signin-label">PASSWORD</label>
                                <input className="signin-password-input"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={onChange}
                                    aria-label="Password"
                                    autoComplete="off" // or "password"
                                />
                            </div>

                            <label className="signin-label">{error && <div className="error-message">{error}</div>}</label>
                            
                            
                            <div> 
                                <button className="signin-button" disabled={loading}>Sign in</button>
                            </div>

                            <div>
                                <Link className="signin-link" to="/ForgotPassword">Forgot Password</Link>
                            </div>
                            <div>
                                <Link className="signin-link" to="/SignUpEmail">Sign Up</Link>
                            </div>
                        </div>
                    </form>
                            <Modal 
                                isOpen={modalOpen} 
                                onClose={() => setModalOpen(false)} 
                                title={modalTitle} 
                                message={modalMessage} 
                            />
                </div>
    );
}

export default SignIn;*/