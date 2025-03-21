import { useState } from "react"
import styles from "../styling/Manage.module.css"
import { addElment } from "../../JS_script/Addelemnt"
import { FormPage } from "../../auth_page"

function ManageStudent(){

    // this hook tracks whether the session is started or not 
    // initial state would be false ..
    let [isSessionStart,setSession] = useState(false)

    // this hook tracks the sessional year ..
    // the sessional year i.e. 1,2,3 depending on the teacher, which class year he/she is in 
    let [SessChossenYear,setSessData] = useState(null)

    // this element is shown when the sessionn isnt started yet
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
        {/* shown the emptyFieldElemnt according to the issessionstart value*/ }
        {isSessionStart ? "":emptyFieldElement}

        {/* if the session is start then Sess_elemnt will render with passed args*/ }
        {isSessionStart ? <Sess_elemnt courseName={"CSE"} Year={SessChossenYear}/> : ""}
        
        </>
    )
}


function Sess_Form({setData,Data,setSessionCondition}){

    // here the session logic is applied
    // this function will be run when the form related to session is submitted..
    let  SessFormHandle = (e)=>{
        // this will stop is default reload
        e.preventDefault()
        // this will store the formdata refrence somehting like that
        let SessFormData = new FormData(e.target)
        // Data is the year chosen in sess_Form so the logic applied here is...
        // as the sessional data means for single class the sesional year can be 1,2or 3
        // it cant be changed anytime
        // so if data isnt equall to either 1,2 and 3 it means the year isnt choosen yet
        // if data becomes  1,2 or 3 it means we have choose a sessional year so it cant be
        // select twice so i use not eqall 
        if (Data !== '1' && Data !== '2' && Data !== '3'){
            // set the selected sessional year
            setData(SessFormData.get("Year"))
            // set sessinal value to true whch will render the sess_elemnt
            setSessionCondition(true)
        }
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
    
    // this hook keeps track of all the added roll numbers
    let [AddedRollNum,setAddedRollnum] = useState([])

    
    let AddStudentFormHandling =(e)=>{

        e.preventDefault()
        let formData = new FormData(e.target)
        let Roll_number = formData.get("Rollnumber").trim()
        if ( !AddedRollNum.includes(Roll_number) && Roll_number.trim() !== ""){
            setAddedRollnum([...AddedRollNum,Roll_number])
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