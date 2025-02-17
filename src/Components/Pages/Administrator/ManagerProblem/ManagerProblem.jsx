import React,{useState , useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { _ProblemList, _ProblemRemove, _ProblemReply, _ProblemStatus } from '../../../Functions/Problem';

import ReSearch from '../../../../assets/Administrator/icon/research.ico';
import Remove from '../../../../assets/Administrator/icon/delete.ico';
//CSS
import "../../../Style/Administrator/ManagerProblem/ManagerProblem.css";


const ManagerProblem = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const LoadData = () => {
          _ProblemList()
              .then(res => {
                  setData(res.data);
                  console.log('List', res.data);
              })
              .catch(err => {
                  console.log(err);
              });
      };
  
      useEffect(() => {
          LoadData();
      }, []);
  
  
      /* start Remove Problem */
      const ProblemRemove = (id,username) => {
        const value ={
            id,
            username
        }
          _ProblemRemove(value)
              .then(res => {
                  alert(res.data);
                  LoadData();
              })
              .catch(err => {
                  console.log(err);
              });
      };
      /* stop Remove Problem */

      /*Problem status start*/
      const [selectedValue, setSelectedValue] = useState('');
      const ProblemStatus = (e, username)=>{
        const problemstatus = e.target.value;
        setSelectedValue(problemstatus);
    
       const value = {
            username,
            problemstatus
       }
        _ProblemStatus(value)
        .then(res=>{
            alert(res.data)
            LoadData();
        }).catch(err=>{
            console.log(err)
        })
    }
      /*Problem status stop*/
  
      /*start search.....*/
       const [searchTerm , setSearchTerm] = useState('');
  
       const filteredProducts = data
       .map(item => item.productname)
       .filter(product => 
          product && product.toLowerCase().includes(searchTerm.toLowerCase())
       );
   
       const navigate = useNavigate();
   
       const handleClick = (product) => {
         setSearchTerm(product);
         navigate(`/ProductUpdateByName/${product}`)
       };
       /*stop search.....*/   
  
      /* start panigation */
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
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



  return (
    <div>
            <h2>Manager Problem</h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginBottom:15}}>
                        <div>
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
                                                {filteredProducts.map((product, index) => (
                                                        <li key={index} onClick={() => handleClick(product)}>
                                                                {product}
                                                        </li>
                                                    ))}
                                        </ul>
                                        )}
                            </div>
                        </div>
                    </div>
            
                        <div className="problem-container">
                            <div className="problem-item">No</div>
                            <div className="problem-item">Identification</div>
                            <div className="problem-item">Problem Subject</div>
                            <div className="problem-item">Username</div>
                            <div className="problem-item">Email Address</div>
                            <div className="problem-item">Report Time</div>
                            <div className="problem-item">Problem Status</div>
                            <div className="problem-item">Acction</div>
                        </div>
            
                        {currentProducts
                        .map((item, index) => (
                            <div key={index}>
                                <div className="problem-container">
                                    <div className="problem-item">{index + indexOfFirstProduct + 1}</div>
                                    <div className="problem-item"><div>{item._id}</div></div>
                                    <div className="problem-item"><div style={{wordWrap:'break-word'}}>{item.problemsubject}</div></div>
                                    <div className="problem-item"><div style={{wordWrap:'break-word'}}>{item.username}</div></div>
                                    <div className="problem-item"><div style={{wordWrap:'break-word'}}>{item.email}</div></div>

                                    <div className="problem-item"><div style={{wordWrap:'break-word'}}>{new Date(item.createdAt).toLocaleDateString('en-GB', {
                                                                                            day: 'numeric',
                                                                                            month: 'long',
                                                                                            year: 'numeric',
                                                                                            hour: 'numeric',
                                                                                            minute: 'numeric',
                                                                                            hour12: true // Use 12-hour format
                                                                                        })}
                                                                                    </div></div>
                                    <div className="problem-item"><div style={{wordWrap:'break-word'}}><select defaultValue={selectedValue} onChange={(e)=>ProblemStatus(e,item.username)}>
                                                                                                    <option defaultValue={item.problemstatus}>{item.problemstatus}</option>
                                                                                                    <option value="Pending">Pending</option>
                                                                                                    <option value="Finish">Finish</option>
                                                                                                    </select>
                                                                                            </div></div>
                                     <div className="problem-item" > 
                                                                <Link to={'/ProblemDetail/'+item._id}>
                                                                    <img className="icon-style" src={ReSearch} />
                                                                </Link>
                                                                <div className='icon-style'
                                                                                 role="button" 
                                                                                 tabIndex={0} 
                                                                                 onClick={() => {
                                                                                     const confirmRemoval = window.confirm("Are you sure you want to remove ? ");
                                                                                     if (confirmRemoval) {
                                                                                         try {
                                                                                            ProblemRemove(item._id,item.username);
                                                                                         } catch (error) {
                                                                                             console.error("Error removing", error);
                                                                                             alert("There was an issue removing the item. Please try again.");
                                                                                         }
                                                                                     }
                                                                                 }} 
                                                                                 onKeyDown={(e) => {
                                                                                     if (e.key === 'Enter' || e.key === ' ') {
                                                                                         e.preventDefault(); // Prevent scrolling when pressing space
                                                                                         const confirmRemoval = window.confirm("Are you sure you want to remove ?");
                                                                                         if (confirmRemoval) {
                                                                                             try {
                                                                                                 ProblemRemove(item._id,item.username);
                                                                                             } catch (error) {
                                                                                                 console.error("Error removing :", error);
                                                                                                 alert("There was an issue removing the item. Please try again.");
                                                                                             }
                                                                                         }
                                                                                     }
                                                                                 }}  
                                                                             >
                                                                    <img className='icon-style' src={Remove} alt="Remove" />                       
                                                                </div>
                                    </div>  
                                </div>
                            </div>
                        ))}
            
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

export default ManagerProblem
