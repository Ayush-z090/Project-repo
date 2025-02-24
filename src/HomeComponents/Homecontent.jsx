import { useNavigate } from "react-router";
import styles from "../styling/home.module.css"

function HomeContent(){
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path); // Change this to the route you want
    };
    return(
        <>
            <div className={styles.home_content}>
                <hgroup className=".hgroup">
                    <h1>Smart Attendance <span className={styles.boldSpanText}>HasslQe-Free</span></h1>
                    <p>Scan <span className={styles.boldSpanText}>QR codes</span> and mark your attendance in seconds Fast, Secure, and Reliable!</p>
                </hgroup>
                <div className={styles.link_section}>
                    <button onClick={()=>{handleNavigation("/userForm")}}>get started</button>
                    <p>already have an account .? <a onClick={()=>{handleNavigation("/auth/login")}}>login</a></p>
                </div>
            </div>

        </>
    )
}

export {HomeContent}