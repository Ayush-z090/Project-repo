import { useNavigate } from "react-router";
import styles from "../styling/auth_style.module.css"
import { InputField } from "./signup"
import { useEffect, useState } from "react";
import { validationPartNum, validationPartPass } from "../JS_script/Validation_inter";
import { Loader } from "../teacher_section/qrCodeGenrate";

function LogIn(){

    const navigate = useNavigate();
    let [loader,setLoader] = useState(false)

    validationPartNum();
    validationPartPass();

    let handleform = (e)=>{
        e.preventDefault()
        setLoader(!loader)
        let formdata = new FormData(e.target)
        let userData = Object.fromEntries(formdata.entries())
        fetch("https://backendapi-aexs.onrender.com/login",
            {
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(userData)
            }
        )
        .then(res=> res.json())
        .then(data=>{
            if (data && data['status'] === "OK"){
                localStorage.setItem("name",data.name)
                localStorage.setItem("course",data.course)
                localStorage.setItem("isSess",JSON.stringify(data.isSess.status))
                localStorage.setItem("role",data.role)
                setLoader(!loader)
                e.target.lastElementChild.lastElementChild.innerHTML = "login Succefull"
                e.target.lastElementChild.lastElementChild.style.backgroundColor = "green"

                setTimeout(()=>{
                    data.role === "Students" ? navigate("/user_dashboard") : navigate("/admin_dashboard")
                },1000)
            }

            
        })
        .catch(rej=>console.log("error"))

        
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