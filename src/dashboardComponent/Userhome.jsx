import { useState } from "react"
import styles from "../styling/UserHome.module.css"


function UserHome(){

    let [stateOne,setOne] = useState(false)
    let [stateTwo,setTwo] = useState(false)

    let {M,E} =JSON.parse(localStorage.getItem("attendance"))

    let elementOne = (<div className={styles.dropdown_content} id="classses-show--dropdown">
        <div className={styles.attend} id="p1">
            <p>period 1 
                <span className={styles.time} id="p1-time">09:91 am</span>
            </p>
        </div>
        <div className={styles.attend} id="p2">
            <p>period 2 
                <span className={styles.time} id="p2-time">10:91 am</span>
            </p>
        </div>
        
    </div>)

    let elemntTwo = (<div className={styles.dropdown_content} id="classses-show--dropdown">
        <div className={styles.attend} id="morning">
            <p>morning <span className={styles.status} id="morning-status">{M ? "Present":"Absent"}</span></p>
        </div>
        <div className={styles.attend} id="evening">
            <p>Evening <span className={styles.status} id="evening-status">{E ? "Present":"Absent"}</span></p>
        </div>
        
    </div>)

    return(
        <>
            <div className={styles.homeSection} >
                <h1>
                    hello,
                    <span id="usrName">{localStorage.getItem("name")}</span>
                    <p>heres today class summary</p>
                </h1>
                <div className={styles.dropdown_trigger} id="classes-summary">
                    <div>
                        <h1 onClick={()=>{setOne(!stateOne)}} >today's classes 
                        </h1>
                        {stateOne?elementOne:""}
                    </div>
                    <div className={styles.classes} >
                        <h1 onClick={()=>{setTwo(!stateTwo)}}>attendence status 
                        </h1>
                        {stateTwo?elemntTwo:""}
                    </div>
                </div>
            </div>

        </>
    )
}

export {UserHome}