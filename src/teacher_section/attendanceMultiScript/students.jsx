import { useState } from "react";
import { students } from "../../JS_script/Studentdata";
import styles from "../styling/students.module.css"

function StudentList(){
    return(
        <>
        <div className="stuDetails_Attendance">
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
                    {/* <div className={styles.M_body}>
                        <p>morning</p>
                            <label>
                                present
                                <input type="radio" name="Morning" value="A" id="P"/>
                            </label>
                            <label>
                                absent
                                <input type="radio" name="Morning" value="A" id="A"/>
                            </label>

                    </div> */}
                    <RadioArea name={"morning"} attence={morning_A} key={"M"}/>
                    <RadioArea name={"evening"} attence={Evening_A} key={"E"}/>
                </div>
            </div>
        </>
    )
}

function RadioArea({name,attence}){

    let result=""

    let[stats,setstats] = useState(false)
    
    if (attence === "P"){
        result = true
    }
    else{
        result= false
    }

    function handleChange(){
    
    }
    return(
        <>
        <form className={styles.status_body}>
            <p>{name}</p>
            <div className={styles.input_area}>
            <label>
                present
                <input type="radio" name={name} value="P" id="P" checked={result} onChange={handleChange}/>
            </label>
            <label>
                absent
                <input type="radio" name={name} value="A" id="A"checked={!result}  onChange={handleChange}/>
            </label>

            </div>
        </form>

        </>
    )
}

export {StudentList}