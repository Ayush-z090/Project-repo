import { useEffect, useRef, useState } from "react";
import { students } from "../../JS_script/Studentdata";
import styles from "../styling/students.module.css"
import { attendanceMap } from "../../JS_script/allFetch";


function StudentList(){

    let [isEmptyField,setFieldCondition] = useState(true)
    const [studentRollNum,setStudentRollCollection] = useState(JSON.parse(localStorage.getItem("studentRollNum"))[0])
    let [stuArr,setStuArr]= useState([])

   
        useEffect(()=>{
        if(studentRollNum.length !== 0)
            {

            attendanceMap("POST",localStorage.getItem("course"),studentRollNum).then(data=>{
                setFieldCondition(false)
                console.log(data.value)
                setStuArr(data.value)
            }).catch((rej)=>console.log(rej))
            
        }


        },[])
    

    const EmptyFieldStyle = {
        "backgroundColor": "rgba(0, 0, 0, 0.096)",
        "padding":"3rem 0 ",
        "textAlign": "center",
        "textTransform": "capitalize",
        "fontFamily": "poppins,serif",
        "color": "rgba(255, 255, 255, .6)"
        }

    let emptyFieldElement = (<div style={EmptyFieldStyle}>
            <h1>no students here</h1>
        </div>)

    return(
        <>
        <div className={styles.stuDetails_Attendance}>

            {isEmptyField ? emptyFieldElement : stuArr.map(data=><Student name={data.name} rollno={data.dataUserId} attendace_arr={data.attendance_status} key={data.dataUserId}/>)}
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
        //we are adding below two key (name,rollnumber) with their value
        data["name"]=student_Name;
        data["rollNumber"]=student_rollNum;
        console.log("Submitted Data:", data); // Log data

    }

    // in this we arent using any buttonn to submit form so we are using useReff hool
    // when the handlechange triggers, the reffrece of form at the moment the value changes that moment filds value will be submitted
    const handleChange = () => {
        if (formReff.current) {    
            console.log("change deteceted")
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