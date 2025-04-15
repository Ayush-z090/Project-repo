import { useEffect, useMemo, useState } from "react"
import styles from "./styling/home.module.css"
import { attendanceMap} from "../JS_script/allFetch"
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Face2Icon from '@mui/icons-material/Face2';
import DescriptionIcon from '@mui/icons-material/Description';


function T_home(){
    let [state,setState]= useState("M")
    let totalStudent = JSON.parse(localStorage.getItem("studentRollNum"))[0]
    let [Morning,setMorning]= useState(0)
    let [evening,setEvening]= useState(0)


   
        useEffect(()=>{
            let tempMor= 0;
            let tempEve = 0
        if(totalStudent.length !== 0)
            {

                
            attendanceMap("POST",localStorage.getItem("course"),totalStudent).then(data=>{
                data.value.forEach(data=>{
                    let {M,E} = data.attendance_status
                    if(M) setMorning(++tempMor);
                    if(E) setEvening(++tempEve)

                })
            })
            
        }},[])


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
                <h1>hello {localStorage.getItem("name")}</h1>
                <p>we hope u are having a good day</p>
            </div>
        </div>
        <FormAttend formAction={formAction}/>
        { state === "M"?
            <AttendanceField 
            statusTime={"Morning"} 
            value={{"present":Morning,"absent":totalStudent.length - Morning,"leave":0,"total":totalStudent.length}}/>
            :
            <AttendanceField 
            statusTime={"Evening"} 
            value={{"present":evening,"absent":totalStudent.length - evening,"leave":0,"total":totalStudent.length}}/>
        }
        </>
    )
}

function AttendanceField({statusTime,value}){

    const iconSty ={width:"100%",height:"100%"}

    return(
        <>
        <div className={styles.attendenceDetailsBox}>
            <h1>{statusTime} class summary</h1>

            <div className={styles.summarg_Field}>
                <BoxInfo status="total student" value={value.total} icon={<PersonIcon sx={iconSty}/>}/>
                <BoxInfo status="Present Today" value={value.present} icon={<PeopleAltIcon sx={iconSty}/>}/>
                <BoxInfo status="Absent Today" value={value.absent} icon={<Face2Icon sx={iconSty}/>}/>
                <BoxInfo status="application" value={value.leave} icon={<DescriptionIcon sx={iconSty}/>}/>
            </div>
        </div>
        </>
    )
}

function BoxInfo({status,value,icon}){
    return(
        <div className={styles.box}>
            <div className={styles.icon}>{icon}</div>
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