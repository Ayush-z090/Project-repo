import { useRef, useState } from "react";
import { students } from "../../JS_script/Studentdata";
import styles from "../styling/students.module.css"

function StudentList(){
    return(
        <>
        <div className={styles.stuDetails_Attendance}>
            {students.map(data=><Student name={data.name} rollno={data.rollNumber} attendace_arr={data.attendance} key={data.rollNumber}/>    
)}
         </div>
        </>
    )
}

// passed obj arguunt contains obj-> {string,integer,array->[obj,obj],array->[obj,obj]}

function Student({name,rollno,attendace_arr,totalAttend_arr}){

    let morning_A = attendace_arr.M ? "P" : "A";
    let Evening_A = attendace_arr.E ? "P" : "A"

    return(
        <>
            <div className={styles.student_element}>
                <div className={styles.infoBody}>
                    <span>{name}</span>
                    <span>{rollno}</span>
                </div>
                <div className={styles.attendaceBody}>
                    <h4>status</h4>
                    <RadioArea time={"morning"} attence={morning_A} key={"M"} student_Name={name} student_rollNum={rollno}/>
                    <RadioArea time={"evening"} attence={Evening_A} key={"E"} student_Name={name} student_rollNum={rollno}/>
                </div>
            </div>
        </>
    )
}

function RadioArea({time,attence,student_Name,student_rollNum}){

    let result=""
    let formReff = useRef(null)
    
    if (attence === "P"){
        result = true
    }
    else{
        result= false
    }

  
    let formHandle = (e)=>{
        e.preventDefault()
        const formData = new FormData(formReff.current);
        const data = Object.fromEntries(formData.entries());
        data["name"]=student_Name;
        data["rollNumber"]=student_rollNum;
        console.log("Submitted Data:", data); // Log data

    }
    const handleChange = () => {
        if (formReff.current) {    
          formReff.current.requestSubmit(); // Submit the form
        }
      };



    return(
        <>
        <form ref={formReff}  onSubmit={formHandle} className={styles.status_body}>
            <p>{time}</p>
            <div className={styles.input_area}>
            <label>
                present
                <input type="radio" name={time} value="P" id="P" defaultChecked={result} onChange={handleChange}/>
            </label>
            <label>
                absent
                <input type="radio" name={time} value="A" id="A" defaultChecked={!result}  onChange={handleChange}/>
            </label>

            </div>
        </form>

        </>
    )
}

export {StudentList}