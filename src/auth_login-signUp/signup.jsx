import { Navigate, useNavigate } from "react-router"
import styles from "../styling/auth_style.module.css"
import { conftirmPasword, validationPartNum, validationPartPass } from "../JS_script/Validation_inter";

function SignUp(){

    const navigate = useNavigate();

    validationPartNum()
    validationPartPass()
    conftirmPasword()

    let handleform = (e)=>{
        e.preventDefault()
        let formdata = new FormData(e.target)
        let dataObj = Object.fromEntries(formdata.entries())
        let precFormData = JSON.parse(sessionStorage.getItem("userForm_one_Data"))
        
        if (precFormData) {

            let extraTea_data={
                "isSess":{
                        "status":false,
                        "sessional_year":null,
                        "sess_users":[],
                        "QrCodeData":null
                }
                
            }

            let extraStu_data = {
                "attendance_status":{
                                        "M":"",
                                        "E":""
                                    },
                "totall_attendance":{
                                        "M":0,
                                        "E":0,
                                        "days":0},
                    "sessional_year": null
                }




            let collecteddata = precFormData.role === "Students" ? {...dataObj,...precFormData,...extraStu_data} : {...dataObj,...precFormData,...extraTea_data}
            console.log(collecteddata)

            fetch("https://backendapi-aexs.onrender.com/users",
                {
                    method:"POST",
                    headers: { "Content-Type": "application/json" },
                    body:JSON.stringify(collecteddata)
                }
            ).
            then(res=> res.json()).
            then(data=>{
                console.log(data)
                if (data && data.status === "OK"){
                    alert(data.message)
                    navigate("/auth/login")
                }
                else if (data && data.status === "found"){
                    alert(data.message)
                }
            }).
            catch(rej=> console.log("error occured"))
            
        }
        else{
            alert("fill the previous form first")
            navigate("/userForm")
        }

        
    }

    
    return(
        <>
            <div className={styles.box} id="signIn-box">
                <hgroup className={styles.heading}>
                    <a href="#" className={styles.link}>{"<--"}</a>
                    <h1>sign up</h1>
                    <p>already have a account? <a onClick={()=>{navigate("./login")}} className={styles.link}id="login" >login</a></p>
                </hgroup>
                <form onSubmit={handleform} className={styles.form_field} id="signUp-form">
                    <fieldset className={styles.fieldset} aria-required="true">
                        <InputField 
                            labelText= "user id" 
                            type="number" 
                            id="UserId"
                            name="dataUserId"
                            />
                        
                        <div className={styles.role_drop_down}>
                            <label htmlFor="role">Course</label>
                            <select name="course" className={styles.role} id="role" required>
                                <option value="" role="contentinfo">select your course</option >
                                <option value="cse">CSE</option>
                                <option value="it">It</option>
                                <option value="mechanics">mechanics</option>
                            </select>
                        </div>

                        <InputField 
                            labelText= "password" 
                            type="password" 
                            id="UserPassword"
                        />

                        <InputField 
                            labelText= "password" 
                            type="password" 
                            id="confirmUserPassword"
                            name="password"

                            
                        />
                        
                        <button className={styles.button}>signUp</button>
                    </fieldset>
                </form>
            </div>

        </>
    )
}




function InputField(data){
    return(
        <>
            <div className={styles.input_field}>
                <label htmlFor={data.id}>{data.labelText}</label>
                <input type={data.type} name={data.name} id={data.id} required/>
            </div>

        </>
    )
}

export {SignUp,InputField}