import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Redux
import { useSelector } from 'react-redux';
//Function
import { _Profile } from '../../../../Functions/Auth';
import { _ProblemReport } from '../../../../Functions/Problem';
//Function For update Problem Status
import { _CurrentUser } from '../../../../Functions/Auth';
import { useDispatch } from 'react-redux';
import { loggedInUsers } from '../../../../Reducer/userSlice.jsx'; // Import your action creator
//Modal
import Modal from '../../../../Style/Utility/Modal/Modal.jsx'


const Problem_Report = () => {
  //Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  const [fileName, setFileName] = useState('');
  const [form, setForm] = useState({
    problemsubject: '',
    username: '',
    email: '',
    problemdescription: '',
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
  });

  const  onChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({
        ...form,
        [name]: files[0], // Update the specific file input
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formWithImageData = new FormData();
      for (const key in form) {
        if (form[key]) { // Avoid appending empty values
          formWithImageData.append(key, form[key]);
          //console.log(form)
        }
      }
      try { 
        
       if(form.problemsubject == null || form.username == null || form.email == null || form.file1 == null || form.file2 == null){
          setModalOpen(true);
          setModalTitle('Error');
          setModalMessage('Please add complete information.');
        return
       }

        const res = await _ProblemReport(formWithImageData);
        console.log(formWithImageData)

          setModalOpen(true);
          setModalTitle('Success');
          setModalMessage(res.data);

          setTimeout(() => {
            navigate('/')
          },1500)

      } catch (err) {
            setModalOpen(true);
            setModalTitle('Error');
            setModalMessage(err.response.data);
      }
    };

    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);

    const id = user.id;
    const authtoken = user.token;
    
    useEffect(()=>{
        _Profile(id,authtoken)
        .then(res=>{
            setForm({
                username: res.data.username
            })
        }).catch(err=>{
            console.log(err)
        })
    },[id, authtoken])


  //Check Status Problem Status  

  // Redux
  const dispatch = useDispatch();
 const tokenId = localStorage.getItem('token'); // Get token from local storage
 //const tokenId = sessionStorage.getItem('token'); // Get token from session storage
  useEffect(() => {
    if (tokenId) {
      _CurrentUser(tokenId)
        .then(res => {
          dispatch(loggedInUsers({ 
            id: res.data._id,
            username: res.data.username,
            email : res.data.email,
            phone : res.data.phone,
            token: tokenId,
            role: res.data.role,
            file : res.data.file,
            cart : res.data.cart,
            problemstatus : res.data.problemstatus,
          }));
        })
        .catch(err => {
          console.error('Error:', err);
          // Optionally: dispatch an action to handle errors
        });
    }
  }, [tokenId, dispatch]);


  return (
    <div>
      <h2 style={{ marginBottom: 50 }}>Problem Report</h2>
      
      <form style={{backgroundColor:'white',paddingLeft:25,paddingRight:50,paddingTop:15}} onSubmit={handleSubmit} encType='multipart/form-data'>

        <div style={{ display: 'block', marginBottom: '20px'}}>
          <label style={{ display: 'block' }}>Problem Subject</label>
          <input
            type="text"
            name="problemsubject"
            value={form.problemsubject}
            onChange={onChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ display: 'block', marginBottom: '20px' }}>
          <label style={{ display: 'block' }}>Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ display: 'block', marginBottom: '20px' }}>
          <label style={{ display: 'block' }}>Description</label>
          <textarea
            name="problemdescription"
            value={form.problemdescription}
            rows={10}
            maxLength={2000}
            onChange={onChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', height: '100px' }}
          />
        </div>

        <div style={{ display: 'block', marginBottom: '20px' }}>
          <label htmlFor="problemimg1" style={{ display: 'block' }}>
            Problem Image 1 :
          </label>
          <input
            type="file"
            id="file1"
            name="file1"
            onChange={onChange}
            accept=".jpg,.jpeg,.png"
            style={{ padding: '8px', marginTop: '5px' }}
          />
          {fileName && <p style={{fontSize:12}}>Selected file: {fileName}</p>}
        </div>

        <div style={{ display: 'block', marginBottom: '20px' }}>
          <label htmlFor="problemimg2" style={{ display: 'block' }}>
            Problem Image 2 :
          </label>
          <input
            type="file"
            id="file2"
            name="file2"
            onChange={onChange}
            accept=".jpg,.jpeg,.png"
            style={{ padding: '8px', marginTop: '5px' }}
          />
          {fileName && <p style={{fontSize:12}}>Selected file: {fileName}</p>}
        </div>

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' , backgroundColor:'blueviolet' , borderRadius:5}}>
          Send Report
        </button>
        
      </form>

                            <Modal 
                                isOpen={modalOpen} 
                                onClose={() => setModalOpen(false)} 
                                title={modalTitle} 
                                message={modalMessage} 
                            />
    </div>
  );
};

export default Problem_Report;


{/*<div style={{ display: 'block', marginBottom: '20px' }}>
          <label style={{ display: 'block' }}>Username</label>
          <input 
            type="text"
            name="username"
            value={form.username}
            readOnly={true}
            onChange={onChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px'}}
          />
        </div>*/}