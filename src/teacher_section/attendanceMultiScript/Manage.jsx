import { useState } from "react"
import styles from "../styling/Manage.module.css"
import { addElment } from "../../JS_script/Addelemnt"
import { FormPage } from "../../auth_page"

function ManageStudent(){

    let [isSessionStart,setSession] = useState(false)
    let [SessChossenYear,setSessData] = useState(null)
    let emptyFieldElement = (<div className={styles.emptyField}>
        <h1>no Session added yet</h1>
    </div>)


    return(
        <>
        <div className="Sessional_Field">

            <hgroup className={styles.sessionalData}>
                <h1>start session</h1>
            </hgroup>
            <Sess_Form setData={setSessData} Data={SessChossenYear} setSessionCondition={setSession}/>

        </div>
        <hgroup className={styles.note}>

            <p>
                <span>note:</span>
                Here u can manage your students list, only here u can add and delet student.Before that <span>its mandatory to start a session</span> , Fill the above mentioned details to start session after that u can mange the the studens .
                <span>For now Only one session can be created</span>
            </p>

        </hgroup>

        {isSessionStart ? "":emptyFieldElement}

        {isSessionStart ? <Sess_elemnt courseName={"CSE"} Year={SessChossenYear}/> : ""}
        
        </>
    )
}


function Sess_Form({setData,Data,setSessionCondition}){

    
    let  SessFormHandle = (e)=>{
        e.preventDefault()
        let SessFormData = new FormData(e.target)
        if (Data !== '1' && Data !== '2' && Data !== '3'){
            setData(SessFormData.get("Year"))
        }
        setSessionCondition(true)
    }

    return(
        <>
            <form className={styles.form} onSubmit={SessFormHandle}>
                <fieldset aria-required>
                    <div className={styles.courseBlock}>
                        <p>course : <span>cse</span></p>
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.RadioArea}>
                            <input type="radio" name="Year" value="1" id="YearOne" required/> 1st
                        </label>
                        <label  className={styles.RadioArea}>
                            <input type="radio" name="Year" value="2" id="YearTwo"/> 2nd
                        </label>
                        <label  className={styles.RadioArea}>
                            <input type="radio" name="Year" value="3" id="YearThree"/> 3rd
                        </label>
                    </div>
                    <button>start</button>
                </fieldset>
            </form>
        </>
    )
}


function Sess_elemnt({courseName,Year}){
    
    let [AddedRollNum,setAddedRollnum] = useState([])
    let [num,setNum] = useState(0)

    let AddStudentFormHandling =(e)=>{

        e.preventDefault()
        let formData = new FormData(e.target)
        let Roll_number = formData.get("Rollnumber").trim()
        if ( !AddedRollNum.includes(Roll_number) && Roll_number.trim() !== ""){
            setAddedRollnum([...AddedRollNum,Roll_number])
            setNum(++num)
        }
    }
    

    return(
        <>
            <div className={styles.Sess_Element}>
                <header>
                    <h1>Course: {courseName} </h1>
                    <h1>year : {Year}</h1>
                </header>
                <form className={styles.formStudentupdation} onSubmit={AddStudentFormHandling}>
                    <div className={styles.input_field}>
                    <label htmlFor="rollNum">Enter studen Roll_number</label>
                    <input type="number" name="Rollnumber" id="rollNum" />
                    </div>
                    <button id="clickTarget">  Add student</button>
                </form>
            </div>
            <div className={styles.StudentDetailsField}>
            <div className={styles.stuHeading}>
                <h4>sno</h4>
                <h4>Roll number</h4>
            </div>
            <div className={styles.studentList} id="addElementField">
                {AddedRollNum.map(a=>
                <StudntDetailsform 
                Sno={AddedRollNum.indexOf(a)+" :"} 
                rollnumber={a} 
                key={a} 
                RollNumCollection={AddedRollNum}
                setCollection = {setAddedRollnum}
                />)}
            </div>
        </div>

        </>
    )

}

function StudntDetailsform({Sno,rollnumber,RollNumCollection,setCollection}){

    let FormHandling=(e)=>{
        e.preventDefault()
        setCollection(removeElement(RollNumCollection,rollnumber))
        
    }

    return(
        <>
            <form className={styles.studentAddForm} onSubmit={FormHandling}>
               <ul>
                <li style={{width:"2rem"}}>{Sno}</li>
                <li> <input type="number" value={rollnumber} readOnly /></li>
                <li><button>remove</button></li>
               </ul>
            </form>
        </>
    )

}

function removeElement(arr,element){
    let index = arr.indexOf(element)
    let NewArr = [...arr.slice(0,index),...arr.slice(index+1,)]
    return NewArr
}



export {ManageStudent}