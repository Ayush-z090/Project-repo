import { useNavigate } from "react-router";
import styles from "../styling/auth_style.module.css"
import { InputField } from "./signup"
import { useEffect, useState } from "react";
import { validationPartNum, validationPartPass } from "../JS_script/Validation_inter";
import { Loader } from "../teacher_section/qrCodeGenrate";
import { userLogin } from "../JS_script/allFetch";

function LogIn(){

    const navigate = useNavigate();
    let [loader,setLoader] = useState(false)
    
    // handle numper validationn part and passward validaation part 
    validationPartNum();
    validationPartPass();

    // handle form submition
    let handleform = (e)=>{
        // stop the form default action
        e.preventDefault()

        // loader is true meaning now loader should be running
        setLoader(true)
        // collecting form data
        let formdata = new FormData(e.target)
        let userData = Object.fromEntries(formdata.entries())

        //call to userLogin user data to store it in loacalStorage
        userLogin(userData)
        .then(data=>{
            // check if the data is null or not if its status is good ("OK" means data is correct)
            console.log(data)
            if (data && data['status'] === "OK"){
                // setting some localStorage key value pair
                localStorage.setItem("name",data.name);
                localStorage.setItem("course",data.course);
                localStorage.setItem("role",data.role)
                // localStorage should store these paris if role or user is a teacher
                // else store the other specified data
                if (data.role === "Teachers")
                    {
                    localStorage.setItem("isSess",JSON.stringify(data.isSess.status))
                    localStorage.setItem("studentRollNum",JSON.stringify([data.isSess.sess_users]))
                    }
                else{
                    localStorage.setItem("email",data.email)
                    localStorage.setItem("attendance",JSON.stringify({"M":false,"E":false}))
                    localStorage.setItem("userId",data.id)
                }

                
                // as now we wannt to tell user whether the user logged in or not to do that
                // we are using innerHTMl property it will reset the innercontent of button means the loader component is completely 
                // removed and the new enterd content will be render there with background
                e.target.lastElementChild.lastElementChild.innerHTML = "login Succefull"
                e.target.lastElementChild.lastElementChild.style.backgroundColor = "green"

                // after setting button innerContent the settimeout will run this functuon after some sec 
                setTimeout(()=>{
                    data.role === "Students" ? navigate("/user_dashboard") : navigate("/admin_dashboard")
                },1000)

            }
            else{
                alert(data.message,": ",data.status)
                setLoader(false)
                e.target.reset()

            }

            
        })
        .catch(rej=>{
            alert("error occured : not connected to internet")
            setLoader(false);
            e.target.reset()
        })

        
    }

    return(
        <>
            <div className={styles.box} id="logIn-box">
            <hgroup className={styles.heading}>
                <a href="#" className={styles.link}>{"<--"}</a>
                <h1>log in</h1>
                <p>don't have an account? <a onClick={()=>{navigate("/userForm")}} id="signUp" className={styles.link}>signUp</a></p>
            </hgroup>
            <form onSubmit={handleform} className="form_field" id="logIn-form">
                <fieldset className={styles.fieldset} aria-required="true">

                    <InputField 
                        labelText ="user id" 
                        name="id"
                        id="userId"
                        type="number"
                    />

                    <InputField 
                        labelText ="Password" 
                        name="password"
                        id="userPassword"
                        type="password"
                    />
                    
                    <button className={styles.button}>
                        {loader ? "":"login"}
                        {loader ? <Loader color={"white"}/>: ""}
                        
                        </button>
                </fieldset>
            </form>
            </div>

        </>
    )
}


export {LogIn}