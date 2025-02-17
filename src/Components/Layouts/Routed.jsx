import {Routes, Route} from "react-router-dom"

//Auth

//SignUp By Phone
import SignUp_Verify_Phone from "../Pages/Auth/SignUp/SignUp_By_Phone/SignUp_Verify_Phone.jsx"
import SignUp_Verify_OTP_Phone from "../Pages/Auth/SignUp/SignUp_By_Phone/SignUp_Verify_OTP_Phone.jsx"
import SignUp_Phone from "../Pages/Auth/SignUp/SignUp_By_Phone/SignUp_Phone.jsx"
//SignUp By Email
import SignUp_Verify_Email from "../Pages/Auth/SignUp/SignUp_By_Email/SignUp_Verify_Email.jsx"
import SignUp_Verify_OTP_Email from "../Pages/Auth/SignUp/SignUp_By_Email/SignUp_Verify_OTP_Email.jsx"
import SignUp_Email from "../Pages/Auth/SignUp/SignUp_By_Email/SignUp_Email.jsx"

//SingIn
import SignIn from "../Pages/Auth/SignIn/SignIn.jsx"

//Forgot Password Choice
import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword.jsx"

//Forgot Password By Phone
import ForgotPassword_Verify_Phone from "../Pages/Auth/ForgotPassword/FotgotPassword_By_Phone/ForgotPassword_Verify_Phone.jsx"
import ForgotPassword_Verify_OTP_Phone from "../Pages/Auth/ForgotPassword/FotgotPassword_By_Phone/ForgotPassword_Verify_OTP_Phone.jsx"
import Reset_Password_By_Phone from "../Pages/Auth/ForgotPassword/FotgotPassword_By_Phone/Reset_Password_By_Phone.jsx"

//Forgot Password By Email
import ForgotPassword_Verify_Email from "../Pages/Auth/ForgotPassword/FotgotPassword_By_Email/ForgotPassword_Verify_Email.jsx"
import ForgotPassword_Verify_OTP_Email from "../Pages/Auth/ForgotPassword/FotgotPassword_By_Email/ForgotPassword_Verify_OTP_Email.jsx"
import Reset_Password_By_Email from "../Pages/Auth/ForgotPassword/FotgotPassword_By_Email/Reset_Password_By_Email.jsx"

//Profile and Acoount
import Profile from "../Pages/Auth/Profile/Profile.jsx"

//Account
import Account from "../Pages/Auth/Profile/Account.jsx"

import Verifyemail from "../Pages/Auth/Profile/ChangeEmail/Verifyemail.jsx"
import VerifyemailOTP from "../Pages/Auth/Profile/ChangeEmail/VerifyemailOTP.jsx"
import ChangeEmail from "../Pages/Auth/Profile/ChangeEmail/ChangeEmail.jsx"

import Verifyphone from "../Pages/Auth/Profile/ChangePhone/Verifyphone.jsx"
import VerifyphoneOTP from "../Pages/Auth/Profile/ChangePhone/VerifyphoneOTP.jsx"
import ChangePhone from "../Pages/Auth/Profile/ChangePhone/ChangePhone.jsx"


//Administrator
import Adminitratordashboard from "../Pages/Administrator/Adminitratordashboard.jsx"
//User 
import ManagerUsers from "../Pages/Administrator/ManagerUsers/ManagerUsers.jsx"
import UsersUpdate from "../Pages/Administrator/ManagerUsers/UsersUpdate.jsx"
import UsersUpdateByName from "../Pages/Administrator/ManagerUsers/UsersUpdateByName.jsx"
//Product
import ManagerProducts from "../Pages/Administrator/ManagerProducts/ManagerProducts.jsx"
import ProductCreate from "../Pages/Administrator/ManagerProducts/ProductCreate.jsx"
import ProductUpdate from "../Pages/Administrator/ManagerProducts/ProductUpdate.jsx"
import ProductUpdateByName from "../Pages/Administrator/ManagerProducts/ProductUpdateByName.jsx"
//Product Order
import ManagerProductsOrder from "../Pages/Administrator/ManagerProductsOrder/ManagerProductsOrder.jsx"
import Product_Purchase_Order from "../Pages/Administrator/ManagerProductsOrder/Product_Purchase_Order.jsx"
//Problem 
import ManagerProblem from "../Pages/Administrator/ManagerProblem/ManagerProblem.jsx"
import ProblemDetail from "../Pages/Administrator/ManagerProblem/ProblemDetail.jsx"


//User
import UserPage from "../Pages/User/UserPage"
import News from "../Pages/User/News"
import About from "../Pages/User/About"
import Contact from "../Pages/User/Contact"
//Support Center
import Support from "../Pages/User/Support/Support.jsx"
import Problem_Report from "../Pages/User/Support/Problem_Report/Problem_Report.jsx"
import Problem_Report_Status from "../Pages/User/Support/Problem_Report/Problem_Report_Status.jsx"
import Privacy_And_Policy from "../Pages/User/Support/Privacy&Policy/Privacy_And_Policy.jsx"
import Terms_of_Service from "../Pages/User/Support/Terms_of_Service/Terms_of_Service.jsx"
//Refill
import Refill from "../Pages/User/Refill/Refill.jsx"
import PaymentQR from "../Pages/User/Refill/PaymentQR/PaymentQR.jsx"

//Error Page 404
import Error from "../Pages/User/Error"

//Products
import Products from "../Pages/User/Products/Products/Products.jsx"
//name
import ProductsDetail from "../Pages/User/Products/ProductsDetails/ProductDetail.jsx"
//id
import ProductsDetails from "../Pages/User/Products/ProductsDetails/ProductsDetails.jsx"
import ProductsCarts from "../Pages/User/Products/ProductsCarts/ProductsCarts.jsx"
import ProductsPaynow from "../Pages/User/Products/ProductsPaynow/ProductsPaynow.jsx"
import ProductsOrderList from "../Pages/User/Products/ProductsOrderList/ProductsOrderList.jsx"
import ProductsTrack from "../Pages/User/Products/ProductsTrack/ProductsTrack.jsx"


//Protect Routes
import ProtectUserRoute from '../Routes/ProtectUserRoute'
import ProtectAdminRoute from '../Routes/ProtectAdminRoute'
import ProtectRouteSignIn from "../Routes/ProtectRouteSignIn"
import ProtectProblemReport from "../Routes/ProtectProblemReport.jsx"



export const Routed = ()=> {
return(
    <div>
            <Routes>
                <Route path="/" element={<UserPage/>}/>

                <Route path="/SignIn" element={
                    <ProtectRouteSignIn>
                        <SignIn/>
                    </ProtectRouteSignIn>
                }/>
                <Route path="/SignUpVerifyPhone" element={<SignUp_Verify_Phone/>}/>
                <Route path="/SignUpVerifyOTPPhone" element={<SignUp_Verify_OTP_Phone/>}/>
                <Route path="/SignUpPhone" element={<SignUp_Phone />}/>
                
                <Route path="/SignUpVerifyEmail" element={<SignUp_Verify_Email/>}/>
                <Route path="SignUpVerifyOTPEmail" element={<SignUp_Verify_OTP_Email/>}/>
                <Route path="/SignUpEmail" element={<SignUp_Email />}/>

                <Route path="/ForgotPassword" element={<ForgotPassword />}/>

                <Route path="/ForgotPasswordVerifyPhone" element={<ForgotPassword_Verify_Phone/>}/>
                <Route path="/ForgotPasswordVerifyOTPPhone" element={<ForgotPassword_Verify_OTP_Phone/>}/>
                <Route path="/ResetPasswordByPhone" element={<Reset_Password_By_Phone/>}/>

                <Route path="/ForgotPasswordVerifyEmail" element={<ForgotPassword_Verify_Email/>}/>
                <Route path="/ForgotPasswordVerifyOTPEmail" element={<ForgotPassword_Verify_OTP_Email/>}/>
                <Route path="/ResetPasswordByEmail" element={<Reset_Password_By_Email />}/>

                <Route path="/Profile" element={
                    <ProtectUserRoute>
                        <Profile/>
                    </ProtectUserRoute>
                }/>

                {/*Account*/}

                <Route path="/Account" element={
                    <ProtectUserRoute>
                        <Account />
                    </ProtectUserRoute>
                }/>

                <Route path="/Verifyemail" element={
                    <ProtectUserRoute>
                        <Verifyemail />
                    </ProtectUserRoute>
                }/>

                <Route path="/VerifyemailOTP" element={
                    <ProtectUserRoute>
                        <VerifyemailOTP />
                    </ProtectUserRoute>
                }/>

                <Route path="/ChangeEmail" element={
                    <ProtectUserRoute>
                        <ChangeEmail />
                    </ProtectUserRoute>
                }/>

                <Route path="/Verifyphone" element={
                    <ProtectUserRoute>
                        <Verifyphone />
                    </ProtectUserRoute>
                }/>

                <Route path="/VerifyphoneOTP" element={
                    <ProtectUserRoute>
                        <VerifyphoneOTP />
                    </ProtectUserRoute>
                }/>

                <Route path="/ChangePhone" element={
                    <ProtectUserRoute>
                        <ChangePhone />
                    </ProtectUserRoute>
                }/>   

                {/*Account*/}

                {/*Refill*/}

                <Route path="/Refill" element={
                        <Refill/>
                }/>

                <Route path="/PaymentQR" element={
                    <ProtectUserRoute>
                        <PaymentQR/>
                    </ProtectUserRoute>
                }/>

                {/*Refill*/}

                <Route path="/UserPage" element={<UserPage/>}/>
                <Route path="/News" element={<News/>}/>

                <Route path="/Products" element={
                    <ProtectUserRoute>
                        <Products/>
                    </ProtectUserRoute>
                }/>
                {/*byname*/}
                <Route path="/ProductsDetail/:name" element={
                        <ProductsDetail />
                }/>

                {/*byid*/}
                <Route path="/ProductsDetails/:id" element={
                        <ProductsDetails />
                }/>

                <Route path="/ProductsPaynow/:id" element={
                    <ProtectUserRoute>
                        <ProductsPaynow />
                    </ProtectUserRoute>
                }/>

                <Route path="/ProductsCarts" element={
                    <ProtectUserRoute>
                        <ProductsCarts />
                    </ProtectUserRoute>
                        
                }/>

                <Route path="/ProductsOrderList" element={
                    <ProtectUserRoute>
                        <ProductsOrderList />
                    </ProtectUserRoute>
                }/>

                <Route path="/ProductsTrack/:id" element={
                    <ProtectUserRoute>
                        <ProductsTrack />
                    </ProtectUserRoute>
                }/>

                <Route path="/About" element={<About/>}/>

                <Route path="/Contact" element={<Contact/>}/>


                {/*Support*/}
                <Route path="/Support" element={<Support/>}/>
                <Route path="/ProblemReport" element={
                    <ProtectUserRoute>
                        <ProtectProblemReport>
                            <Problem_Report/>
                        </ProtectProblemReport>
                    </ProtectUserRoute>
                }/>
                <Route path="/ProblemReportStatus" element={
                        <Problem_Report_Status/>
                }/>
                <Route path="/Privacy&Policy" element={<Privacy_And_Policy/>}/>
                <Route path="/Termsofservice" element={<Terms_of_Service/>}/>
                {/*Support*/}


                {/*Role Adminstrator*/}
                <Route path="/Adminitratordashboard" element={
                    <ProtectAdminRoute>
                        <Adminitratordashboard />
                    </ProtectAdminRoute>
                }/>

                {/*User*/}
                <Route path="/ManagerUsers" element={
                    <ProtectAdminRoute>
                        <ManagerUsers />
                    </ProtectAdminRoute>
                }/>
                {/*By Id*/}
                <Route path="/UserUpdate/:id" element={
                    <ProtectAdminRoute>
                        <UsersUpdate />
                    </ProtectAdminRoute>
                }/>

                {/*By Name*/}
                <Route path="/UserUpdateByName/:name" element={
                    <ProtectAdminRoute>
                        <UsersUpdateByName />
                    </ProtectAdminRoute>
                }/>

                {/*Products*/}
                <Route path="/ManagerProducts" element={
                    <ProtectAdminRoute>
                        <ManagerProducts />
                    </ProtectAdminRoute>
                }/>

                <Route path="/ProductCreate" element={
                    <ProtectAdminRoute>
                        <ProductCreate />
                    </ProtectAdminRoute>
                }/>

                {/*By Id*/}
                <Route path="/ProductUpdate/:id" element={
                    <ProtectAdminRoute>
                        <ProductUpdate />
                    </ProtectAdminRoute>
                }/>

                 {/*By Name*/}
                 <Route path="/ProductUpdateByName/:name" element={
                    <ProtectAdminRoute>
                        <ProductUpdateByName />
                    </ProtectAdminRoute>
                }/>


                {/* Product Order */}
                <Route path="/ManagerProductsOrder" element={
                    <ProtectAdminRoute>
                        <ManagerProductsOrder />
                    </ProtectAdminRoute>
                }/>

                <Route path="/ProductPurchaseOrder/:id" element={
                    <ProtectAdminRoute>
                        <Product_Purchase_Order />
                    </ProtectAdminRoute>
                }/>

                {/*Problem*/}
                <Route path="/ManagerProblem" element={
                    <ProtectAdminRoute>
                        <ManagerProblem />
                    </ProtectAdminRoute>
                }/>

                <Route path="/ProblemDetail/:id" element={
                    <ProtectAdminRoute>
                        <ProblemDetail />
                    </ProtectAdminRoute>
                }/>
                
                <Route path="/*" element={<Error/>}/>

            </Routes>
    </div>
    )
}