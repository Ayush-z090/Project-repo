import styles from "./styling/Dashboard.module.css"
import { Link, Outlet } from "react-router";
import { useState } from "react";



function DashBoard(){

    const [Showclass,setClass] = useState(false)

    
    return(
        <>
            <div className={styles.dashborad_layout}>
                {/* <!-- menubar ...start--> */}
                <MenuTopBar Showclass={Showclass} tothe="/user_dashboard"/>
                {/* <!-- menubar ...end--> */}
                <div className={styles.menubar_layout}>
                    <TopBar setClass={setClass} Showclass ={Showclass}/>
                    <h1>attender</h1>
                </div>
                <div className={styles.dashborad_section_content}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

function TopBar({Showclass,setClass}){
    // console.log(pushedclass,action)
    return(
        <>
                    <span className={`${styles.menu_icon } ${Showclass?styles.show:""}`} onClick={()=>{setClass(!Showclass)}}>
                        <div className={styles.bar} id="top"></div>
                        <div className={styles.bar} id="mid"></div>
                        <div className={styles.bar} id="bottom"></div>
                    </span>

        </>
    )
}

function MenuTopBar({Showclass,tothe}){
    return(
        <>
            <div className={`${styles.menu_side_bar} ${Showclass? styles.hide: ""} `}>
                <ul className={styles.section_component}>
                    <Link href="#profile" className={styles.section} id="profile">
                        Profile
                    <hr className={styles.underLine}/>
                    </Link>
                    <Link to={tothe}  className={styles.section} id="home">
                        home
                    <hr className={styles.underLine}/>
                    </Link>
                    <Link to="Attendence"  className={styles.section} id="attendence">
                        attendence
                    <hr className={styles.underLine}/>
                    </Link>
                </ul>
            </div>

        </>
    )
}


export {DashBoard,TopBar,MenuTopBar}