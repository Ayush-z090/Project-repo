import styles from "./styling/Dashboard.module.css"
import { Link, Outlet } from "react-router";
import { useCustomHook } from "./JS_script/customhook";



function DashBoard(){

    const [Showclass,setClass] = useCustomHook()

    function MenuTopBar(){
        return(
            <>
                <div className={`${styles.menu_side_bar} ${Showclass? styles.hide: ""} `}>
                    <ul className={styles.section_component}>
                        <Link href="#profile" className={styles.section} id="profile">
                            Profile
                        <hr className={styles.underLine}/>
                        </Link>
                        <Link to="/dashboard"  className={styles.section} id="home">
                            home
                        <hr className={styles.underLine}/>
                        </Link>
                        <Link to="QrAttendenc"  className={styles.section} id="attendence">
                            attendence
                        <hr className={styles.underLine}/>
                        </Link>
                    </ul>
                </div>
    
            </>
        )
    }
    
    return(
        <>
            <div className={styles.dashborad_layout}>
                {/* <!-- menubar ...start--> */}
                <MenuTopBar/>
                {/* <!-- menubar ...end--> */}
                <div className={styles.menubar_layout}>
                    <span className={`${styles.menu_icon} ${Showclass?styles.show:""}`} onClick={()=>{setClass(!Showclass)}}>
                        <div className={styles.bar} id="top"></div>
                        <div className={styles.bar} id="mid"></div>
                        <div className={styles.bar} id="bottom"></div>
                    </span>
                    <h1>attender</h1>
                </div>
                <div className={styles.dashborad_section_content}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}


export {DashBoard}