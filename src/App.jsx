import { useState } from 'react'
import { BrowserRouter,Route,Routes } from "react-router"
import { Home, HomeContent, HomeForm } from './home'
import { FormPage } from './auth_page'
import { SignUp } from './auth_login-signUp/signup'
import { LogIn } from './auth_login-signUp/login'
import { DashBoard } from './dashBoard'
import { UserHome } from './dashboardComponent/Userhome'
import { Attendance } from './dashboardComponent/attendance'
import { T_home } from "./teacher_section/TeacherHome";
import { TeacherDashboard } from './DashboardTeacher'
import { AttendSession } from './teacher_section/AttendenceSess'
import { ManageStudent } from './teacher_section/attendanceMultiScript/Manage'
import { StudentList } from './teacher_section/attendanceMultiScript/students'




function App(){


    let student = (
    <Route path="/user_dashboard" element={<DashBoard/>}>
        <Route index element={<UserHome/>}/>
        <Route path='Attendence' element={<Attendance/>} />
    </Route>
    )
    
    let teacher =(
        <Route path="/admin_dashboard" element ={<TeacherDashboard/>}>

            <Route index element={<T_home/>}/>
            <Route path='Attendence' element={<AttendSession/>}>
                    <Route index element={<StudentList/>}/>
                    <Route path={"ManageStudent"} element={<ManageStudent/>}/>
            </Route>
        </Route>
    )




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

                {student}
                
                {teacher}
                
            </Routes>

        </BrowserRouter>
        
        </>
    )
}

export default App
