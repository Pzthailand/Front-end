import { useEffect } from "react";
import { useForm } from "react-hook-form"; //npm i react hook form
import { _SignUp } from "../../../../Functions/Auth"; // Function
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { signUpUsers } from "../../../../Reducer/userSlice";
// CSS
import '../../../../Style/Auth/SignUp/SignUp.css';

function SignUp_Phone() {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.user);
    const phone = user.phone;

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setValue('birthday', today); // Set default date
    }, [setValue]);

    const onSubmit = async (data) => {

        if (data.password !== data.passwordc) {
            alert('Passwords do not match');
            return;
        }

        // Age validation
        const birthday = new Date(data.birthday);
        const age = new Date().getFullYear() - birthday.getFullYear();
        const monthDiff = new Date().getMonth() - birthday.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < birthday.getDate())) {
            age;
        }

        if (age < 15) {
            alert('You must be at least 15 years old to sign up.');
            return;
        }
        
        const signUpData = {
            ...data,
            phone,
        };

        try {
            const res = await _SignUp(signUpData);
            alert(res.data);
            dispatch(signUpUsers(null));
            navigate('/SignIn'); // Navigate to SignIn
        } catch (err) {
            alert(err.response.data);
        }
    };

    return (
        <div>
        <h1 style={{marginTop:50}}>Sign up</h1>
        <div className="signup-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <input className="signup-input"
                        type="text"
                        placeholder="Username"
                        {...register('username', {
                            required: 'Username is required',
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/, // Allow both lowercase and uppercase letters
                                message: 'Username must contain only letters a-z or A-Z and 0-9'
                            }
                        })}
                    />
                </div>

                <div>{errors.username && <p className="signup-error-message">{errors.username.message}</p>}</div>

                <div>
                    <label>Password</label>
                    <input className="signup-input"
                        type="password"
                        placeholder="Password" 
                        {...register('password', { required: 'Password is required' })}
                    />
                </div>
                {errors.password && <p className="signup-error-message">{errors.password.message}</p>}

                <div>
                    <label>Confirm Password</label>
                    <input className="signup-input"
                        type="password" 
                        placeholder="Confirm Password"
                        {...register('passwordc', { required: 'Please confirm your password' })}
                    />
                </div>
                {errors.passwordc && <p className="signup-error-message">{errors.passwordc.message}</p>}

                <div>
                    <label>First Name</label>
                    <input className="signup-input"
                        type="text"
                        placeholder="First Name" 
                        {...register('fname', { required: 'First name is required' })}
                    />
                </div>
                {errors.fname && <p className="signup-error-message">{errors.fname.message}</p>}

                <div>
                    <label>Last Name</label>
                    <input className="signup-input"
                        type="text"
                        placeholder="Last Name"
                        {...register('lname', { required: 'Last name is required' })}
                    />
                </div>
                {errors.lname && <p className="signup-error-message">{errors.lname.message}</p>}

                <div>
                    <label>Gender</label>

                <div className="select-gender">
                <div>
                        <input
                            style={{ width: 15, height: 15 , cursor:'pointer'}} 
                            type="radio"
                            {...register('gender', { required: 'Gender is required' })}
                            value="male"
                        />
                         <label>Male</label>
                </div>
                </div>

                <div className="select-gender">
                    <div>
                        <input 
                            style={{ width: 15, height: 15 , cursor:'pointer'}} 
                            type="radio"
                            {...register('gender')}
                            value="female"
                        />
                         <label>Female</label>
                    </div>
                </div>
                
                    
                </div>
                {errors.gender && <p className="signup-error-message">{errors.gender.message}</p>}

                <div>
                    <label>Birthday</label>
                    <input className="signup-input"
                        type="date"
                        {...register('birthday', { required: 'Birthday is required' })}
                    />
                </div>
                {errors.birthday && <p className="signup-error-message">{errors.birthday.message}</p>}

                <div>
                    <label>Email Address</label>
                    <input className="signup-input"
                        type="text"
                        placeholder="Email Address"
                        {...register('email', { 
                            required: 'Email Address is required', 
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email format'
                            } 
                        })}
                    />
                </div>
                {errors.email && <p className="signup-error-message">{errors.email.message}</p>}

                <div>
                    <label>Address</label>
                    <textarea className="signup-input-address"
                        placeholder="999 Village No.1 Subdistrict, District, Province"
                        {...register('addres', { required: 'Address is required' })}
                    />
                </div>
                {errors.addres && <p className="signup-error-message">{errors.addres.message}</p>}

                <div>
                    <label>Zip Code</label>
                    <input className="signup-input"
                        type="text"
                        maxLength={5} 
                        placeholder="Zip code"
                        {...register('zipcode', { 
                            required: 'Zip code is required', 
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Zip code must contain only numbers'
                            }
                        })}
                    />
                </div>
                {errors.zipcode && <p className="signup-error-message">{errors.zipcode.message}</p>}

                <button type="submit" className="create-account-button" disabled={isSubmitting}>
                    Create Account
                </button>
            </form>
        </div>
    </div>
    );
}

export default SignUp_Phone;




/*import { useEffect } from "react";
import { useForm } from "react-hook-form"; //npm i react hook form
import { _SignUp } from "../../../../Functions/Auth"; // Function
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { signUpUsers } from "../../../../Reducer/userSlice";
// CSS
import '../../../../Style/Auth/SignUp/SignUp.css';
//ico
//import Mark  from '../../../../assets/Pages/Auth/SignUp/mark.ico'
function SignUp_Phone() {
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.user);
    const phone = user.phone;

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setValue('birthday', today); // Set default date
    }, [setValue]);

        const onSubmit = async (data) => {

        if (data.password !== data.passwordc) {
            alert('Passwords do not match');
            return;
        }

        // Age validation
        const birthday = new Date(data.birthday);
        const age = new Date().getFullYear() - birthday.getFullYear();
        const monthDiff = new Date().getMonth() - birthday.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < birthday.getDate())) {
            age;
        }

        if (age < 15) {
            alert('You must be at least 15 years old to sign up.');
            return;
        }
        
        const signUpData = {
            ...data,
            phone,
        };

        try {
            const res = await _SignUp(signUpData);
            alert(res.data);
            dispatch(signUpUsers(null));
            navigate('/SignIn'); // Navigate to SignIn
        } catch (err) {
            alert(err.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="signup-container">
                <div></div>
                <h1>Sign up</h1>
                
                <div><label>Username</label></div>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        {...register('username', {
                            required: 'Username is required',
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/, // Allow both lowercase and uppercase letters
                                message: 'Username must contain only letters a-z or A-Z and 0-9'
                            }
                        })}
                    />
                </div>
                <div></div>
                <div>
                    {errors.username &&<p className="signup-error-message">{errors.username.message}</p>}</div>    
               
                
                <div><label>Password</label></div>
                <div><input type="password"
                            placeholder="Password" 
                            {...register('password', { required: 'Password is required' })} /></div>
                <div></div>
                <div>{errors.password && <p className="signup-error-message">{errors.password.message}</p>}</div>
                
                
               
                <div><label>Confirm Password</label></div>
                <div><input type="password" 
                            placeholder="Confirm Password"
                            {...register('passwordc', { required: 'Please confirm your password' })} /></div>
                <div></div>
                <div>{errors.passwordc && <p className="signup-error-message">{errors.passwordc.message}</p>}</div>
               

               
                <div><label>First Name</label></div>
                <div><input type="text"
                            placeholder="First Name" 
                            {...register('fname', { required: 'First name is required' })} /></div>
                <div></div>
                <div>{errors.fname && <p className="signup-error-message">{errors.fname.message}</p>}</div>
                

                
                <div><label>Last Name</label></div>
                <div><input type="text"
                            placeholder="Last Name"
                            {...register('lname', { required: 'Last name is required' })} /></div>
                <div></div>
                <div>{errors.lname && <p className="signup-error-message">{errors.lname.message}</p>}</div>
                
               
                <div><label>Gender</label></div>
                
                <div><input style={{width:15,height:15,cursor:'pointer'}} type="radio" {...register('gender' , {required :'gender is required'})}  value="male" />
                <label style={{marginRight:300}}>Male</label></div>

                <div></div>
                <div><input style={{width:15,height:15,cursor:'pointer'}} type="radio" {...register('gender')} value="female" />
                <label style={{marginRight:290}}>Female</label></div>
                <div></div>
                <div>{errors.gender && <p className="signup-error-message">{errors.gender.message}</p>}</div>
                

                
                <div><label>Birthday</label></div>
                <div><input type="date" {...register('birthday', { required: 'Birthday is required' })} /></div>
                <div></div>
                <div>{errors.birthday && <p className="signup-error-message">{errors.birthday.message}</p>}</div>

                <div><label>Email Address</label></div>
                <div><input type="text"
                            placeholder="Email Address"
                            {...register('email', { required: 'Email Address is required', 
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email format',
                                    } 
                             })} /></div>
                <div></div>
                <div>{errors.zipcode && <p className="signup-error-message">{errors.zipcode.message}</p>}</div>
                   
                

               
                <div><label>Address</label></div>
                <div><textarea  className = 'signup-address'
                                type="text"
                                maxLength={250}
                                placeholder="999 Village No.1 Subdistrict, District, Province" 
                                {...register('addres', { required: 'Address is required'})} /></div>
                <div></div>
                <div>{errors.address && <p className="signup-error-message">{errors.address.message}</p>}</div>    
                

                
                <div><label>Zip Code</label></div>
                <div><input type="text"
                            maxLength={5} 
                            placeholder="Zip code"
                            {...register('zipcode', { required: 'Zip code is required', 
                                pattern: {
                                    value: /^[0-9]+$/, 
                                    message: 'Username must contain only letters 0-9'
                                    } 
                             })} /></div>
                <div></div>
                <div>{errors.zipcode && <p className="signup-error-message">{errors.zipcode.message}</p>}</div>
                
                <div></div>
                <button type="submit" className="create-account-button" disabled={isSubmitting}>
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default SignUp_Phone;*/
