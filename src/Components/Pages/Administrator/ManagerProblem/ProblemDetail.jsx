import React,{useState , useEffect} from 'react'
import { useNavigate , useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { _ProblemReSearch , _ProblemReply } from '../../../Functions/Problem';

const ProblemDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;

    const selectUser = (state) => state.user;
    const user = useSelector(selectUser);
    const authtoken = user.token;


    const [problemSubject , setProblemSubject]=useState();
    const [username , setUsername]=useState();
    const [email , setEmail]=useState();
    const [time , setTime]=useState();
    const [problemDescription , setProblemDescription]=useState();
    const [file1 , setFile1]=useState();
    const [file2 , setFile2]=useState();
    const [file3 , setFile3]=useState();
    const [file4 , setFile4]=useState();
    const [file5 , setFile5]=useState();

    useEffect(()=> {
      _ProblemReSearch(id)
      .then((res) => {
        console.log(res)
        setProblemSubject(res.data.problemsubject);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setProblemDescription(res.data.problemdescription);
        setTime(res.data.createdAt)
        setFile1(res.data.file1);
        setFile2(res.data.file2);
      })
      .catch((err) =>{
        console.log(err)
      })  
    },[id]);

    const [reply , setReply]=useState('');
    
    const ProblemReply=()=>{
      const message = reply;
        const value = {
            problemSubject,
            email,
            username,
            message,
          }
          console.log(value)
            _ProblemReply(value)
            .then(res=>{
                alert(res.data)
                //navigate('/ManagerProblem');
            }).catch(err=>{
                console.log(err)
            })
        }


  return (
    <div>
          <div style={{display:'block',textAlign:'left'}}>
              <h2>Problem Subject : {problemSubject}</h2>
              <div>Username : {username}</div>
              <div>Email Address : {email}</div>
              <div>Report Time :{new Date(time).toLocaleDateString('en-GB', {
                                                                              day: 'numeric',
                                                                              month: 'long',
                                                                              year: 'numeric',
                                                                              hour: 'numeric',
                                                                              minute: 'numeric',
                                                                              hour12: true // Use 12-hour format
                                                                          })}</div>

              <div style={{width: 1024 , height:'auto',wordBreak:'break-word'}}>Problem Description : {problemDescription}</div>
          </div>

            <div><img style={{width:1024,height:1024,marginTop:20,marginBottom:10}} src={`http://127.0.0.1:8081/api/ProblemImages/${file1}`}  
                    alt="file1"
                    />
            </div>
            <div><img style={{width:1024,height:1024,marginTop:20,marginBottom:10}} src={`http://127.0.0.1:8081/api/ProblemImages/${file2}`}  
                    alt="file2"
                    />
            </div>

            <div style={{display:'flex',width:1024,backgroundColor:'white'}}>

                <label>Reply</label>    
                <textarea
                  style={{width:1024}}
                  rows={10}
                  onChange={e => setReply(e.target.value)}
                ></textarea>

            </div>

            <button style={{backgroundColor:'blueviolet',}} onClick={ProblemReply}>Reply</button>

      </div>
  )
}

export default ProblemDetail
