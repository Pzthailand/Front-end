import { Link } from "react-router-dom"

function Adminitratordashboard(){
    return(
    <div >
        <h2>Adminisrator Dashboard</h2>
        <div style={{textAlign:'left'}}><Link style={{fontSize:13,color:'black'}} to ={'/ManagerUsers'}>1. Manager Users</Link></div>
        <div style={{textAlign:'left'}}><Link style={{fontSize:13,color:'black'}} to ={'/ManagerProducts'}>2. Manager Product</Link></div>
        <div style={{textAlign:'left'}}><Link style={{fontSize:13,color:'black'}} to ={'/ManagerProductsOrder'}>3. Manager Product Order</Link></div>
        <div style={{textAlign:'left'}}><Link style={{fontSize:13,color:'black'}} to ={'/ManagerProblem'}>4. Manager Problem</Link></div>
    </div>
    )
}
export default Adminitratordashboard