import { useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { useState,useEffect } from "react";

import { Switch , Select ,Tag } from 'antd'; //npm install antd
//CSS
import '../../../Style/Administrator/ManagerUser/ManagerUser.css'
import '../../../Style/Administrator/Stylebackdashboard.css'
import '../../../Style/Utility/Pagination.css'
import '../../../Style/Utility/Iconstyle.css'
import '../../../Style/Utility/Search.css'
//ico
import Account from '../../../../assets/Administrator/icon/account-information.ico'
import Remove from '../../../../assets/Administrator/icon/delete.ico'

//Function
import { _ListUsers,_ChangeStatus,_ChangeRole,_RemoveUsers } from "../../../Functions/ManagerUser"

function ManagerUsers(){

    
  
    //Redux
    const selectUser = (state) => state.user;
    const  user  = useSelector(selectUser);
    //const {user} = useSelector((state)=>({...state}))
    
    const authtoken = user.token
    //console.log(authtoken)

        const LoadData = () =>{
            _ListUsers(authtoken)
            .then(res =>{
                setData(res.data);
                //console.log(res.data)
            }).catch(err=>{
                console.log('err',err)
            })
        }

        useEffect(()=> {
            LoadData();
        },[])

        //Receive LoadData
        const [data, setData] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [productsPerPage] = useState(10);


        /* Function  start change status user */
        //Check Status User
        const Status =(e,id)=>{
            console.log(e,id)
            const value = {
                id:id,
                enabled:e // Input e or true , false
            }
            _ChangeStatus(authtoken,value)
            .then(res=>{
                console.log(res)
                LoadData()
            }).catch(err=>{
                console.log(err)
            })
        }

         /* Function stop change status user */


        /* Function start change role user */

        const Roledata = ['admin','user'] 
        const Role =(e,id)=>{
            const value = {
                id:id,
                role:e
            }
            _ChangeRole(authtoken,value)
            .then(res=>{
                console.log(res)
                LoadData()
            }).catch(err=>{
                console.log(err)
            })
        }

    /* Function stop change role user */


    /* Function start remove user */

        const RemoveUsers = (id)=>{
            console.log(authtoken,id)
            _RemoveUsers(authtoken,id)
            .then(res => {
            console.log(res);
            LoadData();
        })
        .catch(err => {
            console.log(err);
        });
    }
    /* Function stop remove user */ 

    /*Function search start*/
    const [searchTerm , setSearchTerm] = useState('');

    const filteredUsername = data
    .map(item => item.username)
    .filter(user => 
        user && user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigate = useNavigate();

    const handleClick = (user) => {
      setSearchTerm(user);
      navigate(`/UserUpdateByName/${user}`)
    };
    /*Function search stop*/


    /* start panigation */
    const indexOfLastUser = currentPage * productsPerPage;
    const indexOfFirstUser = indexOfLastUser - productsPerPage;
    const currentUser = data.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(data.length / productsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    /* stop panigation */

    return(
        <div>
            <h2>Manager Users</h2>

                <div className="search-container">
                <input className='search-input' 
                        placeholder='Search.....'
                        id='searchTerm'
                        name='searchTerm'
                        type='string'
                        autoComplete='off'
                        value={searchTerm} // เพิ่มค่า value เพื่อให้ช่องค้นหามีการแสดงผล
                        onChange={e => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                            <ul className="results">
                                    {filteredUsername.map((user, index) => (
                                            <li key={index} onClick={() => handleClick(user)}>
                                                    {user}
                                            </li>
                                        ))}
                            </ul>
                            )}
                </div>
            

            <div className="UserManager-container">
                    <div className="UserManager-item">No</div>
                    <div className="UserManager-item">Identification</div>
                    <div className="UserManager-item">Username</div>
                    <div className="UserManager-item">Role</div>
                    <div className="UserManager-item">Status</div>
                    <div className="UserManager-item">Firstname</div>
                    <div className="UserManager-item">Lastname</div>
                    <div className="UserManager-item">Email Address</div>
                    <div className="UserManager-item">Phone</div>
                    <div className="UserManager-item">Created</div>
                    <div className="UserManager-item">Updated</div>
                    <div className="UserManager-item">Action</div>
                </div>
        {currentUser.map((item,index) => (
            <div key ={index}>
                <div className="UserManager-container">
                    <div className="UserManager-item">{index+1}</div>
                    <div className="UserManager-item">{item._id}</div>
                    <div className="UserManager-item"><div>{item.username}</div></div>
                    <div className="UserManager-item">
                        <Select style={{width:100}} onChange={(e)=>Role(e,item._id)} size="small" defaultValue={item.role}>
                            {Roledata.map((item,index)=>
                                <Select.Option value={item} key={index}>
                                    {item == 'admin'
                                    ? <Tag color="red">{item}</Tag> 
                                    : <Tag color="blue">{item}</Tag> 
                                    }
                                </Select.Option>        
                            )}
                        </Select></div>
                    <div
                        className="UserManager-item"><Switch size="small" checked={item.enabled} onChange={(e)=>Status(e,item._id)}/>
                    </div>
                    <div className="UserManager-item">{item.fname}</div>
                    <div className="UserManager-item">{item.lname}</div>
                    <div className="UserManager-item">{item.email}</div>
                    <div className="UserManager-item">{item.phone}</div>
                    {/*<div className="UserManager-item"><div style={{textAlign:"left"}}>{item.addres}</div></div>
                    <div className="UserManager-item">{item.zipcode}</div>*/}
                    <div className="UserManager-item">{new Date(item.createdAt).toLocaleDateString('en-GB', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true // Use 12-hour format
                                                          })}
                                                      </div>

                    <div className="UserManager-item">{new Date(item.updatedAt).toLocaleDateString('en-GB', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true // Use 12-hour format
                                                          })}
                                                      </div>
                    <div className="UserManager-item" > 
                            <Link to={'/UserUpdate/'+item._id}>
                                <img className="icon-style" src={Account} />
                            </Link>

                        <div onClick={() => RemoveUsers(item._id)}>
                                    <img className="icon-style" src={Remove} />
                        </div>
                    </div>
                </div>
            </div >))}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>◄</button>
                
                {Array.from({ length: totalPages }, (_, index) => (
                    <button 
                        key={index + 1} 
                        onClick={() => setCurrentPage(index + 1)} 
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>►</button>
            </div>
            <Link className='style-back-dashboard' to="/Adminitratordashboard">Back to Manager Page</Link>  
        </div>
    )
}
export default ManagerUsers