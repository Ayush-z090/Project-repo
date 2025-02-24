import { useState } from 'react'
import { BrowserRouter,Route,Routes } from "react-router"
import { Home, HomeContent, HomeForm } from './home'
import { FormPage } from './auth_page'
import { SignUp } from './auth_login-signUp/signup'
import { LogIn } from './auth_login-signUp/login'
import { DashBoard } from './dashBoard'
import { UserHome } from './dashboardComponent/Userhome'
import { Attendance } from './dashboardComponent/attendance'




function App(){
    return(
        <>

        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home/>}>
                        <Route index element={<HomeContent/>}/>
                        <Route path='userForm' element={<HomeForm/>}/>
                </Route>

                <Route path='/auth' element={<FormPage/>}>
                        <Route index element={<SignUp/>}/>
                        <Route path='login' element={<LogIn/>}/>
                </Route>

                <Route path="/dashboard" element={<DashBoard/>}>
                        <Route index element={<UserHome/>}/>
                        <Route path='QrAttendenc' element={<Attendance/>} />
                </Route>
                
            </Routes>

        </BrowserRouter>
        
        </>
    )
}

export default App
