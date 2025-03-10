import { useState } from "react"
import styles from "./styling/home.module.css"

function T_home(){
    let [state,setState]= useState("M")
    let formAction = (e)=>{
        e.preventDefault()
        let data = new FormData(e.target)
        if(data.get("attend") === "M") setState("M")
        else setState("E")
    
    }
    return(
        <>
        <div className={styles.backColor}></div>
        
        <div className={styles.userDetails}>
            <div className={styles.imgbody}></div>
            <div className={styles.infoBody}>
                <h1>hello Teacher</h1>
                <p>we hope u are having a good day</p>
            </div>
        </div>
        <FormAttend formAction={formAction}/>
        { state === "M"?
            <AttendanceField 
            statusTime={"Morning"} 
            value={{"present":32,"absent":10,"leave":0}}/>
            :
            <AttendanceField 
            statusTime={"Evening"} 
            value={{"present":22,"absent":20,"leave":0}}/>
        }
        </>
    )
}

function AttendanceField({statusTime,value}){
    
    return(
        <>
        <div className={styles.attendenceDetailsBox}>
            <h1>{statusTime} class summary</h1>

            <div className={styles.summarg_Field}>
                <BoxInfo status="total student" value={42} icon={null}/>
                <BoxInfo status="Present Today" value={value.present} icon={null}/>
                <BoxInfo status="Absent Today" value={value.absent} icon={null}/>
                <BoxInfo status="application" value={value.leave} icon={null}/>
            </div>
        </div>
        </>
    )
}

function BoxInfo({status,value,icon}){
    return(
        <div className={styles.box}>
            <div className={styles.icon}></div>
            <hgroup className={styles.currenInfo}>
                <p>{value}</p>
                <h1>{status}</h1>
            </hgroup>

        </div>
    )
}

function FormAttend({formAction}){
    return(
        <>
        <form onSubmit={formAction} className={styles.form}>
        <select name="attend" id="attend">
            <option value="M">Morning</option>
            <option value="E">Evening</option>
        </select>
        <button> Update</button>
        </form>
        </>
    )
}

export {T_home}