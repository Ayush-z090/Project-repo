import { Outlet } from "react-router";
import { MenuTopBar, TopBar } from "./dashBoard";
import styles from "./teacher_section/styling/Dashboard.module.css"
import { useState } from "react";

function TeacherDashboard(){
    let [Showclass,setClass] =useState(false)
    return(
        <>
        <MenuTopBar Showclass={Showclass} tothe={"/admin_dashboard"}/>
        <header className={styles.headerSec}>
        <TopBar Showclass={Showclass} setClass={setClass}/>
        <h1>attender</h1>
        </header>
        <div className="mainSec">
            <Outlet/>
        </div>
        </>
        )
}

export {TeacherDashboard}