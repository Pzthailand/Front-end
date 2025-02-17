import { useEffect } from "react";
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
function SignUp_Email() {
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.user);
    const email = user.email;

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
            email,
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
                

                <div><label>Phone Number</label></div>
                <div><input type="tel"
                            maxLength={10}
                            placeholder="099-999-9999" 
                            {...register('phone', { required: 'Phone number is required' ,
                                pattern: {
                                value: /^[0-9]+$/,
                                message: 'Phone Number must contain only letters 0-9'
                                } 
                            })} /></div>
                <div></div>
                <div>{errors.phone && <p className="signup-error-message">{errors.phone.message}</p>}</div>
                

                
                <div><label>Address</label></div>
                <div><textarea  type="text"
                                maxLength={250}
                                placeholder="999 Village No.1 Subdistrict, District, Province"
                                style={{float:"left", marginLeft:5,height:100,width:300}} 
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

export default SignUp_Email;




/*import { useState,useEffect } from "react";
import { _SignUp } from "../../../Functions/Auth"; //Function
import { useNavigate } from "react-router-dom";
//Redux
import { useSelector,useDispatch } from "react-redux";
import { signUpUsers } from "../../../Reducer/userSlice";

//CSS
import '../../../Style/Auth/SignUp/SignUp.css'

function SignUp (){
    
    //Redux
    const SelectUser = (state) => state.user
    const user = useSelector(SelectUser)
    const dispatch = useDispatch();


    //Check null data
    if (user === null){
        return null;
    }


    const navigate = useNavigate();
    
    const [formData , setFormData] = useState({
        username:'',
        password:'',
        passwordc:'',
        fname:'',
        lname:'',
        gender:'',
        birthday:'',
        phone:'',
        addres:'',
        zipcode:''
    });
    //Loading
    const [Loading,setLoading] = useState(false);
    const {username , password , passwordc, fname, lname ,birthday,phone, addres , zipcode} = formData;
    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    
    const email = user.email //Redux
    

    const onSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        
        if(password !== passwordc){
            alert('Password Not Match')
        } else {
            const value = {
                username,
                password,
                fname,
                lname,
                gender,
                birthday,
                email,
                phone,
                addres,
                zipcode
            }
        //console.log(value)
        _SignUp(value)//Function
        .then(res=>{
            alert(res.data)
            setLoading(false)
            //Redux
            dispatch(signUpUsers(null));
            navigate('/SignIn')//Sign Up Success - Navigate To SignIn
        }).catch(err=>{
        alert(err.response.data)//Response.data in axios
        setLoading(false)
        })
    }
}
console.log(username,password ,birthday,passwordc,email)

const [date, setDate] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
      }, []);


      const [gender, setGender] = useState('');

      const handleGenderSelect = (event) => {
            setGender(event.target.value);
            console.log(`Select gender: ${event.target.value}`);
      };

return(
    <div>
        <div>
            <div>
                   <form onSubmit={e=> onSubmit(e)}>

                    <div className="signUp-container">

                    <div></div>
                    {!Loading ? (<h2>Sign Up</h2>) : (<h2 >Loading...</h2>)} 

                        <div><label> Username : </label></div>
                        <div><input type="text" 
                            name="username" 
                            autoFocus 
                            placeholder="Username" 
                            autoComplete="off"
                            onChange={e => onChange(e)}/>
                        </div>
                        

                        <div><label> Password : </label></div>
                        <div><input type="password" 
                            name="password" 
                            autoFocus 
                            placeholder="Password"
                            autoComplete="off" 
                            onChange={e => onChange(e)}/>
                        </div>
                        

                        <div><label> Confirm Password : </label></div>
                        <div><input type="password" 
                            name="passwordc" 
                            autoFocus 
                            placeholder="Confirm Password"
                            autoComplete="off" 
                            onChange={e => onChange(e)}/>
                        </div>
                        

                        <div><label> First Name : </label></div>
                        <div><input type="text" 
                            name="fname" 
                            autoFocus 
                            placeholder="First Name"
                            autoComplete="off" 
                            onChange={e => onChange(e)}/>
                        </div>
                        

                        <div><label> Last Name : </label></div>
                        <div><input type="text" 
                            name="lname" 
                            autoFocus 
                            placeholder="Last Name"
                            autoComplete="off" 
                            onChange={e => onChange(e)}/>
                        </div>

                        <div><label> Gender : </label></div>
                             
                            <div className='select-gender'>              
                           
                            <input
                                style={{ float: "left", width: 15, height: 15, cursor: 'pointer' }} 
                                type="radio" 
                                id="male" 
                                name="gender"  // Changed from "male" to "gender"
                                value="male"
                                onChange={handleGenderSelect} 
                            />
                            <label style={{ float: "left" }} htmlFor="male">Male</label>

                            <input 
                                style={{ float: "left", width: 15, height: 15, cursor: 'pointer' }} 
                                type="radio" 
                                id="female" 
                                name="gender"  // Changed from "female" to "gender"
                                value="female"
                                onChange={handleGenderSelect} 
                            />
                            <label style={{ float: "left" }} htmlFor="female">Female</label>
                            
                            </div>
      
                      
                        <div><label htmlFor="datemin">Birth day: </label></div>
                                <div><input
                                    type="date"
                                    id="birthday"
                                    name="birthday"
                                    min="1944-01-01"
                                    defaultValue={date}
                                    onChange={e => onChange(e)}/>
                        </div>
                                   
                       

                        <div><label> Phone Number : </label></div>
                        <div><input 
                            type="text" 
                            name="phone" 
                            autoFocus 
                            placeholder="099-999-9999"
                            autoComplete="off"
                            onChange={e => onChange(e)}/>
                        </div>
                        

                        <div><label> Adress : </label> </div>
                        <div> <textarea
                                        style={{ height: 100, width: '90%', fontFamily:'sans-serif'}}
                                        id="addres"
                                        type="text"
                                        name="addres"
                                        placeholder="example : 999/1 district province"
                                        onChange={onChange}
                                        maxLength={250}
                                        autoComplete="off"
                                    />
                        </div>

                       

                        <div><label> Zip Code : </label></div>
                        <div><input type="text" 
                            name="zipcode" 
                            autoFocus 
                            placeholder="Zip Code"
                            autoComplete="off" 
                            onChange={e => onChange(e)}/>
                        </div>

                        <div></div> 

                        <div><button className="create-account-button">Create Account</button></div>
                    </div>

                    </form>
            </div>
        </div>
    </div>
)
}

export default SignUp*/