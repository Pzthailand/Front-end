import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Function
import { _Profile, _ProfileUpdate } from '../../../Functions/Auth';
//Modal
import Modal from '../../../Style/Utility/Modal/Modal';
import '../../../Style/Utility/Modal/Modal.css'
//CSS
import '../../../Style/Auth/Profile/Profile.css';
import '../../../Style/Auth/Profile/ProfileForm.css'
//Default avatar
import Avatar from '../../../../assets/Pages/Auth/Profile/avatar.jpg'


const Profile = () => {
    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);
    const id = user.id;
    const authtoken = user.token;
    const navigate = useNavigate();

    const [fileOld, setFileOld] = useState('');
    const [form, setForm] = useState({
        fname: '',
        lname: '',
        addres: '',
        zipcode: '',
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const res = await _Profile(id, authtoken);
                setForm({
                    fname: res.data.fname,
                    lname: res.data.lname,
                    gender: res.data.gender,
                    birthday: res.data.birthday,
                    addres: res.data.addres,
                    zipcode: res.data.zipcode,
                    file: null,
                    email: res.data.email,
                    phone: res.data.phone,
                });
                setFileOld(res.data.file);
            } catch (err) {
                console.error(err);
                setModalTitle('Error');
                setModalMessage('Failed to load profile data.');
                setModalOpen(true);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, authtoken]);

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files[0]) {
            const file = files[0];
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                setModalTitle('Error');
                setModalMessage('Only JPEG and PNG files are allowed.');
                setModalOpen(true);
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setModalTitle('Error');
                setModalMessage('File size should not exceed 2MB.');
                setModalOpen(true);
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
        setUploadProgress(0); // Reset progress

        // Simulate a 10-second file upload progress
        const simulateUploadProgress = () => {
            let progress = 0;
            const interval = setInterval(() => {
                if (progress < 100) {
                    progress += 10; // Increment progress by 10 every second
                    setUploadProgress(progress);
                } else {
                    clearInterval(interval); // Stop the interval when the progress reaches 100
                }
            }, 1000); // Update progress every second
        };

        simulateUploadProgress(); // Start the simulated upload progress

        try {
            const res = await _ProfileUpdate(user.id, authtoken, formWithImageData);
            setTimeout(() => {
                window.location.reload(); // Refresh the page
                navigate('/Profile');
                setModalTitle('Success');
                setModalMessage(res.data);
                setModalOpen(true);
            }, 1500);
        } catch (err) {
            const errorMessage = err.response?.data || 'An error occurred. Please try again.';
            setModalTitle('Error');
            setModalMessage(errorMessage);
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='profile-form'>
            <h1>Profile Information</h1>
            <h1>Your About and Setting</h1>

            <div>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div>
                        {fileOld !== 'no_image.jpg' ? (
                            <img
                                src={`https://res.cloudinary.com/dwc9pksvu/image/upload/f_auto,q_auto/v1/${fileOld}`}
                                alt='Current Profile'
                                className='profileimages'
                            />
                        ) : (
                            <img src={Avatar} alt='Default avatar' className='profileimages' />
                        )}
                    </div>

                    <div>
                        <label
                            style={{
                                cursor: 'pointer',
                                padding: '10px 10px',
                                backgroundColor: 'blueviolet',
                                color: 'white',
                                borderRadius: '5px',
                                textAlign: 'center',
                                float: 'right',
                            }}
                            htmlFor='file'
                        >
                            Change Image
                        </label>
                        <input
                            style={{ display: 'none' }}
                            type='file'
                            id='file'
                            name='file'
                            onChange={onChange}
                        />
                    </div>

                    <hr style={{ width: 350 }} />
                    <div>
                        <label htmlFor='fname'>First Name</label>
                        <input
                            type='text'
                            id='fname'
                            name='fname'
                            placeholder='First Name'
                            value={form.fname || ''}
                            onChange={onChange}
                            autoComplete='off'
                        />
                    </div>

                    <div>
                        <label htmlFor='lname'>Last Name</label>
                        <input
                            type='text'
                            id='lname'
                            name='lname'
                            placeholder='Last Name'
                            value={form.lname || ''}
                            onChange={onChange}
                            autoComplete='off'
                        />
                    </div>

                    <div>
                        <label htmlFor='gender'>Gender</label>
                        <input
                            type='text'
                            id='gender'
                            name='gender'
                            placeholder='Gender'
                            value={form.gender || ''}
                            onChange={onChange}
                            autoComplete='off'
                            readOnly={true}
                        />
                    </div>

                    <div>
                        <label htmlFor='birthday'>Birth day</label>
                        <input
                            type='date'
                            id='birthday'
                            name='birthday'
                            value={form.birthday || ''}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='addres'>Address</label>
                        <textarea
                            style={{ height: 100, width: '90%' }}
                            id='addres'
                            name='addres'
                            placeholder='Address'
                            value={form.addres || ''}
                            onChange={onChange}
                            maxLength={250}
                            autoComplete='off'
                        />
                    </div>

                    <div>
                        <label htmlFor='zipcode'>Zip Code</label>
                        <input
                            type='text'
                            id='zipcode'
                            name='zipcode'
                            placeholder='Zip code'
                            value={form.zipcode || ''}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <button className='profile-button' type='submit' disabled={loading}>
                            Change
                        </button>
                    </div>

                    {loading && <p>Loading...</p>}

                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div style={{ width: '100%', backgroundColor: '#ddd' }}>
                            <div
                                style={{
                                    height: '8px',
                                    width: `${uploadProgress}%`,
                                    backgroundColor: 'green',
                                    transition: 'width 0.2s ease-in-out',
                                }}
                            ></div>
                        </div>
                    )}
                    {uploadProgress === 100 && <p>Upload Complete</p>}
                </form>
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} message={modalMessage} />
            </div>
        </div>
    );
};

export default Profile;



//10s
/*const Profile = () => {
    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);
    const id = user.id;
    const authtoken = user.token;
    const navigate = useNavigate();

    const [fileOld, setFileOld] = useState('');
    const [form, setForm] = useState({
        fname: '',
        lname: '',
        addres: '',
        zipcode: '',
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const res = await _Profile(id, authtoken);
                setForm({
                    fname: res.data.fname,
                    lname: res.data.lname,
                    gender: res.data.gender,
                    birthday: res.data.birthday,
                    addres: res.data.addres,
                    zipcode: res.data.zipcode,
                    file: null,
                    email: res.data.email,
                    phone: res.data.phone,
                });
                setFileOld(res.data.file);
            } catch (err) {
                console.error(err);
                setModalTitle('Error');
                setModalMessage('Failed to load profile data.');
                setModalOpen(true);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, authtoken]);

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files[0]) {
            const file = files[0];
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                setModalTitle('Error');
                setModalMessage('Only JPEG and PNG files are allowed.');
                setModalOpen(true);
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setModalTitle('Error');
                setModalMessage('File size should not exceed 2MB.');
                setModalOpen(true);
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
        setUploadProgress(0); // Reset progress

        // Simulate a 10-second file upload progress
        const simulateUploadProgress = () => {
            let progress = 0;
            const interval = setInterval(() => {
                if (progress < 100) {
                    progress += 10; // Increment progress by 10 every second
                    setUploadProgress(progress);
                } else {
                    clearInterval(interval); // Stop the interval when the progress reaches 100
                }
            }, 1000); // Update progress every second
        };

        simulateUploadProgress(); // Start the simulated upload progress

        try {
            const res = await _ProfileUpdate(user.id, authtoken, formWithImageData);
            setTimeout(() => {
                window.location.reload(); // Refresh the page
                navigate('/Profile');
                setModalTitle('Success');
                setModalMessage(res.data);
                setModalOpen(true);
            }, 10000);
        } catch (err) {
            const errorMessage = err.response?.data || 'An error occurred. Please try again.';
            setModalTitle('Error');
            setModalMessage(errorMessage);
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='profile-form'>
            <h1>Profile Information</h1>
            <h1>Your About and Setting</h1>

            <div>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div>
                        {fileOld !== 'no_image.jpg' ? (
                            <img
                                src={`http://127.0.0.1:8081/api/UserImages/${fileOld}`}
                                alt='Current Profile'
                                className='profileimages'
                            />
                        ) : (
                            <img src={Avatar} alt='Default avatar' className='profileimages' />
                        )}
                    </div>

                    <div>
                        <label
                            style={{
                                cursor: 'pointer',
                                padding: '10px 10px',
                                backgroundColor: 'blueviolet',
                                color: 'white',
                                borderRadius: '5px',
                                textAlign: 'center',
                                float: 'right',
                            }}
                            htmlFor='file'
                        >
                            Change Image
                        </label>
                        <input
                            style={{ display: 'none' }}
                            type='file'
                            id='file'
                            name='file'
                            onChange={onChange}
                        />
                    </div>

                   
                    <hr style={{ width: 350 }} />
                    <div>
                        <label htmlFor='fname'>First Name</label>
                        <input
                            type='text'
                            id='fname'
                            name='fname'
                            placeholder='First Name'
                            value={form.fname || ''}
                            onChange={onChange}
                            autoComplete='off'
                        />
                    </div>

                    <div>
                        <label htmlFor='lname'>Last Name</label>
                        <input
                            type='text'
                            id='lname'
                            name='lname'
                            placeholder='Last Name'
                            value={form.lname || ''}
                            onChange={onChange}
                            autoComplete='off'
                        />
                    </div>

                    <div>
                        <label htmlFor='gender'>Gender</label>
                        <input
                            type='text'
                            id='gender'
                            name='gender'
                            placeholder='Gender'
                            value={form.gender || ''}
                            onChange={onChange}
                            autoComplete='off'
                            readOnly={true}
                        />
                    </div>

                    <div>
                        <label htmlFor='birthday'>Birth day</label>
                        <input
                            type='date'
                            id='birthday'
                            name='birthday'
                            value={form.birthday || ''}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <label htmlFor='addres'>Address</label>
                        <textarea
                            style={{ height: 100, width: '90%' }}
                            id='addres'
                            name='addres'
                            placeholder='Address'
                            value={form.addres || ''}
                            onChange={onChange}
                            maxLength={250}
                            autoComplete='off'
                        />
                    </div>

                    <div>
                        <label htmlFor='zipcode'>Zip Code</label>
                        <input
                            type='text'
                            id='zipcode'
                            name='zipcode'
                            placeholder='Zip code'
                            value={form.zipcode || ''}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <button className='profile-button' type='submit' disabled={loading}>
                            Change
                        </button>
                    </div>
                    {loading && <p>Loading...</p>}

                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div style={{ width: '100%', backgroundColor: '#ddd'}}>
                            <div
                                style={{
                                    height: '8px',
                                    width: `${uploadProgress}%`,
                                    backgroundColor: 'green',
                                    transition: 'width 0.2s ease-in-out',
                                }}
                            ></div>
                        </div>
                    )}
                    {uploadProgress === 100 && <p>Upload Complete</p>}
                    
                </form>
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} message={modalMessage} />
            </div>
        </div>
    );
};

export default Profile;*/


//Original
/*const Profile = () => {
    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);
    const id = user.id;
    const authtoken = user.token;
    const navigate = useNavigate();

    const [fileOld, setFileOld] = useState('');
    const [form, setForm] = useState({
        fname: '',
        lname: '',
        addres: '',
        zipcode: '',
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const res = await _Profile(id, authtoken);
                setForm({
                    //Profile
                    fname: res.data.fname,
                    lname: res.data.lname,
                    gender: res.data.gender,
                    birthday: res.data.birthday,
                    addres: res.data.addres,
                    zipcode: res.data.zipcode,
                    file: null, //Profile image
                    //Account
                    email: res.data.email, 
                    phone: res.data.phone,
                });
                setFileOld(res.data.file);
            } catch (err) {
                console.error(err);
                setModalTitle('Error');
                setModalMessage('Failed to load profile data.');
                setModalOpen(true);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, authtoken]);

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files[0]) {
            const file = files[0];
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                setModalTitle('Error');
                setModalMessage('Only JPEG and PNG files are allowed.');
                setModalOpen(true);
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setModalTitle('Error');
                setModalMessage('File size should not exceed 2MB.');
                setModalOpen(true);
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
        try {
            const res = await _ProfileUpdate(user.id, authtoken, formWithImageData);
            setModalTitle('Success');
            setModalMessage(res.data);
            setModalOpen(true);
            // Navigate after a brief delay to allow the modal to show
            setTimeout(() => {
                window.location.reload(); // Refresh the page
                navigate('/Profile');
            }, 1500);
        } catch (err) {
            const errorMessage = err.response?.data || 'An error occurred. Please try again.';
            setModalTitle('Error');
            setModalMessage(errorMessage);
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='profile-form'>
                        <h1>Profile information</h1>
                        <h1>Your about and setting </h1>
               
                        <div >
                            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div>
                                    {fileOld !== 'no_image.jpg' ? (
                                          <img
                                          src={`http://127.0.0.1:8081/api/UserImages/${fileOld}`}
                                          alt="Current Profile"
                                          className='profileimages'
                                      />

                                    ) : (
                                            <img 
                                            src={Avatar}
                                            alt="Default avatar"
                                            className='profileimages'
                                        />
                                    )}
                                </div>

                                <div>
                                <label 
                                        style={{
                                            cursor: 'pointer', 
                                            padding: '10px 10px', 
                                            backgroundColor: 'blueviolet', 
                                            color: 'white', 
                                            borderRadius: '5px', 
                                            textAlign: 'center',
                                            float:'right'
                                        }} 
                                        htmlFor="file"
                                        >
                                        Change Image
                                        </label>
                                        <input 
                                        style={{ display: 'none' }} 
                                        type="file" 
                                        id="file" 
                                        name="file" 
                                        onChange={onChange} 
                                        />
                                </div>

                                
                                
                                <hr style={{width:350}}/>
                                <div>
                                    <label htmlFor="fname">First Name</label>
                                    <input type="text" id="fname" name="fname" placeholder="First Name" value={form.fname || ''} onChange={onChange} autoComplete="off"/>
                                </div>

                                <div>
                                    <label htmlFor="lname">Last Name</label>
                                    <input type="text" id="lname" name="lname" placeholder="Last Name" value={form.lname || ''} onChange={onChange} autoComplete="off"/>
                                </div>

                                <div>
                                    <label htmlFor="gender">Gender</label>
                                    <input type="text" 
                                            id="gender" 
                                            name="gender" 
                                            placeholder="Gender" 
                                            value={form.gender || ''} 
                                            onChange={onChange} 
                                            autoComplete="off"
                                            readOnly={true}
                                        />
                                </div>

                                <div> 
                                    <label htmlFor="birthday">Birth day</label>
                                    <input
                                        type="date"
                                        id="birthday"
                                        name="birthday"
                                        value={form.birthday || ''}
                                        onChange={onChange}
                                       
                                    />
                                </div>

                                <div>
                                    <label htmlFor="addres">Address</label>
                                    <textarea
                                        style={{ height: 100, width: '90%' }}
                                        id="addres"
                                        name="addres"
                                        placeholder="Address"
                                        value={form.addres || ''}
                                        onChange={onChange}
                                        maxLength={250}
                                        autoComplete="off"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="zipcode">Zip Code</label>
                                    <input type="text" id="zipcode" name="zipcode" placeholder="Zip code" value={form.zipcode || ''} onChange={onChange} />
                                </div>

                               

                                <div>
                                    <button className='profile-button' type="submit" disabled={loading}>Change</button>
                                </div>


                                {loading && <p>Loading...</p>}
                                

                                </form>
                                    <Modal 
                                        isOpen={modalOpen} 
                                        onClose={() => setModalOpen(false)} 
                                        title={modalTitle} 
                                        message={modalMessage} 
                                    />
                        </div>
        </div>       
    );
};

export default Profile;*/




/*import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Function
import { _Profile, _ProfileUpdate } from '../../../Functions/Auth';
//CSS
import '../../../Style/Auth/Profile/Profile.css';
import '../../../Style/Auth/Profile/ProfileForm.css'
//Default avatar
import Avatar from '../../../../assets/Pages/Auth/Profile/avatar.jpg'



const Profile = () => {
    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);
    const id = user.id;
    const authtoken = user.token;
    const navigate = useNavigate();

    const [fileOld, setFileOld] = useState('');
    const [form, setForm] = useState({
        fname: '',
        lname: '',
        addres: '',
        zipcode: '',
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const res = await _Profile(id, authtoken);
                setForm({
                    //Profile
                    fname: res.data.fname,
                    lname: res.data.lname,
                    gender: res.data.gender,
                    birthday: res.data.birthday,
                    addres: res.data.addres,
                    zipcode: res.data.zipcode,
                    file: null, //Profile image
                    //Account
                    email: res.data.email, 
                    phone: res.data.phone,
                });
                setFileOld(res.data.file);
            } catch (err) {
                console.error(err);
                setErrorMessage('Failed to load profile data.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, authtoken]);

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
            await _ProfileUpdate(user.id, authtoken, formWithImageData);
            setSuccessMessage('Profile updated successfully!');
            navigate('/Profile'); // Navigate after successful update
        } catch (err) {
            setErrorMessage(err.response?.data || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='profile-form'>
                        <h1>Profile information</h1>
                        <h1>Your about and setting </h1>
               
                        <div >
                            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div>
                                    {fileOld !== 'no_image.jpg' ? (
                                          <img
                                          src={`http://127.0.0.1:8081/api/UserImages/${fileOld}`}
                                          alt="Current Profile"
                                          className='profileimages'
                                      />

                                    ) : (
                                            <img 
                                            src={Avatar}
                                            alt="Default avatar"
                                            className='profileimages'
                                        />
                                    )}
                                </div>

                                <div>
                                <label 
                                        style={{
                                            cursor: 'pointer', 
                                            padding: '10px 10px', 
                                            backgroundColor: 'blueviolet', 
                                            color: 'white', 
                                            borderRadius: '5px', 
                                            textAlign: 'center',
                                            float:'right'
                                        }} 
                                        htmlFor="file"
                                        >
                                        Change Image
                                        </label>
                                        <input 
                                        style={{ display: 'none' }} 
                                        type="file" 
                                        id="file" 
                                        name="file" 
                                        onChange={onChange} 
                                        />
                                </div>

                                
                                
                                <hr style={{width:350}}/>
                                <div>
                                    <label htmlFor="fname">First Name</label>
                                    <input type="text" id="fname" name="fname" placeholder="First Name" value={form.fname} onChange={onChange} autoComplete="off"/>
                                </div>

                                <div>
                                    <label htmlFor="lname">Last Name</label>
                                    <input type="text" id="lname" name="lname" placeholder="Last Name" value={form.lname} onChange={onChange} autoComplete="off"/>
                                </div>

                                <div>
                                    <label htmlFor="gender">Gender</label>
                                    <input type="text" 
                                            id="gender" 
                                            name="gender" 
                                            placeholder="Gender" 
                                            value={form.gender} 
                                            onChange={onChange} 
                                            autoComplete="off"
                                            readOnly={true}
                                        />
                                </div>

                                <div> 
                                    <label htmlFor="birthday">Birth day</label>
                                    <input
                                        type="date"
                                        id="birthday"
                                        name="birthday"
                                        value={form.birthday}
                                        onChange={onChange}
                                       
                                    />
                                </div>

                                <div>
                                    <label htmlFor="addres">Address</label>
                                    <textarea
                                        style={{ height: 100, width: '90%' }}
                                        id="addres"
                                        name="addres"
                                        placeholder="Address"
                                        value={form.addres}
                                        onChange={onChange}
                                        maxLength={250}
                                        autoComplete="off"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="zipcode">Zip Code</label>
                                    <input type="text" id="zipcode" name="zipcode" placeholder="Zip code" value={form.zipcode} onChange={onChange} />
                                </div>

                               

                                <div>
                                    <button className='profile-button' type="submit" disabled={loading}>Change</button>
                                </div>


                                {loading && <p>Loading...</p>}
                                {errorMessage && <p className="error">{errorMessage}</p>}
                                {successMessage && <p className="success">{successMessage}</p>}

                            </form>
                        </div>
        </div>       
    );
};



export default Profile;*/
