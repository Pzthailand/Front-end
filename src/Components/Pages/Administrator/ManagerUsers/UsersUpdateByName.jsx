import React, { useEffect, useState } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import { _ReadUsersByName , _UpdateUsersByName , _ChangeStatus,_ChangeRole } from '../../../Functions/ManagerUser';
import Avatar from '../../../../assets/Administrator/jpg/avatar.jpg';
import { useSelector } from 'react-redux';


const UsersUpdateByName = () => {
    const params = useParams();
    const navigate = useNavigate();
    const username = params.name;
    //Id
    const [id , setId] = useState ('');
   
    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);
    const authtoken = user.token;

    const [fileOld, setFileOld] = useState('');
    
    const [form, setForm] = useState({
        status: '',
        fname: '',
        lname: '',
        role: '',
        birthday:'',
        addres: '',
        zipcode: '',
        email: '',
        phone:'',
        file: null,
    });


    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const res = await _ReadUsersByName(username,authtoken);
                setForm({
                    status : res.data.enabled,
                    fname: res.data.fname,
                    lname: res.data.lname,
                    role : res.data.role,
                    birthday: res.data.birthday,
                    email: res.data.email,
                    phone : res.data.phone,
                    addres: res.data.addres,
                    zipcode: res.data.zipcode,
                    file: null,
                });
                setFileOld(res.data.file);
                setId(res.data._id);
            } catch (err) {
                console.error(err);
                setErrorMessage('Failed to load profile data.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [username]);

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files[0]) {
            const file = files[0];
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                setErrorMessage('Only JPEG and PNG files are allowed.');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setErrorMessage('File size should not exceed 2MB.');
                return;
            }
        }
        setForm((prevForm) => ({
            ...prevForm,
            [name]: name === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formWithImageData = new FormData();
        for (const key in form) {
            if (form[key]) {
                formWithImageData.append(key, form[key]);
            }
        }
        if (fileOld) {
            formWithImageData.append('fileold', fileOld);
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await _UpdateUsersByName(username,authtoken,formWithImageData);
            setSuccessMessage('Profile updated successfully!');
            navigate('/ManagerUsers'); // Navigate after successful update
        } catch (err) {
            setErrorMessage(err.response?.data || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };


     /* Function  start change status user */
     const [status, setStatus] = useState('');
     //Check Status User
     const Status =(e)=>{
         //console.log(e,id)
         const value = {
             id,
             enabled:e // Input e or true , false
         }
         _ChangeStatus(authtoken,value)
         .then(res=>{
             console.log(res)
         }).catch(err=>{
             console.log(err)
         })
     }
    /* Function stop change status user */

    /* Function start change role user */
    const [role , setRole]=useState('');
    const Role =(e)=>{
         console.log(e,id)
        const value = {
            id,
            role:e
        }
        _ChangeRole(authtoken,value)
        .then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
    /* Function stop change role user */

    
    return (
        <div>
            <div>
            <div>
                            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div>

                                    {fileOld !== 'no_image.jpg' ? (
                                          <img
                                          src={`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${fileOld}`}
                                          alt="Current Profile"
                                          className='Profileimages'
                                      />

                                    ) : (
                                            <img
                                            src={Avatar}
                                            alt="Default avatar"
                                            className='Profileimages'
                                        />
                                    )}

                                </div>
                                <div>
                                    <label htmlFor="file">New Image:</label>
                                    <input type="file" id="file" name="file" onChange={onChange} />
                                </div>

                                <div>
                                    <div style={{display:'flex',width:150,marginBottom:10}}>
                                    <label>Status :</label>
                                    <select defaultValue={status} onChange={(e)=>Status(e.target.value)}>
                                                          <option defaultValue={status}>{form.status === true ? 'ON' : 'OFF' }</option>
                                                          <option value="true">ON</option>
                                                          <option value="false">OFF</option>
                                                        </select>
                                    </div>
                                </div>
                                    
                               
                                <div>
                                    <div style={{display:'flex',width:150,marginBottom:10}}>
                                    <label>Role :</label>
                                    <select defaultValue={role} onChange={(e)=>Role(e.target.value)}>
                                                          <option defaultValue={role}>{form.role === 'admin' ? 'Administrator' : 'User' }</option>
                                                          <option value="admin">Administrator</option>
                                                          <option value="user">User</option>
                                                        </select>
                                    </div>
                                </div>

                                
                                <div>
                                    <label htmlFor="fname">First Name:</label>
                                    <input type="text" id="fname" name="fname" placeholder="First Name" value={form.fname} onChange={onChange} />
                                </div>
                                <div>
                                    <label htmlFor="lname">Last Name:</label>
                                    <input type="text" id="lname" name="lname" placeholder="Last Name" value={form.lname} onChange={onChange} />
                                </div>
                                <div>
                                    <label htmlFor="birthday">Birth day:</label>
                                    <input type="text" id="birthday" name="birthday" value={form.birthday} onChange={onChange} />
                                </div>
                                <div>
                                    <label htmlFor="addres">Address:</label>
                                    <textarea
                                        style={{ height: 100, width: '100%' }}
                                        id="addres"
                                        name="addres"
                                        placeholder="Address"
                                        value={form.addres}
                                        onChange={onChange}
                                        maxLength={250}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="zipcode">Zip Code:</label>
                                    <input type="text" id="zipcode" name="zipcode" placeholder="Zip code" value={form.zipcode} onChange={onChange} />
                                </div>

                                <div>
                                    <label htmlFor="email">Email : </label>
                                    <input type="text" id="email" name="email" placeholder="email" value={form.email} onChange={onChange} />
                                </div>

                                <div>
                                    <label htmlFor="phone">Phone : </label>
                                    <input type="text" id="phone" name="phoneemail" placeholder="phone" value={form.phone} onChange={onChange} />
                                </div>
                                
                                <div>
                                    <button  className='Profile-button' type="submit" disabled={loading}>Change</button>
                                </div>

                                {loading && <p>Loading...</p>}
                                {errorMessage && <p className="error">{errorMessage}</p>}
                                {successMessage && <p className="success">{successMessage}</p>}

                            </form>
                        </div>
                </div> 
        </div>    
    );
};

export default UsersUpdateByName;
