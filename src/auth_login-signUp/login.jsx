import { useNavigate } from "react-router";
import styles from "../styling/auth_style.module.css"
import { InputField } from "./signup"
import { useEffect } from "react";
import { validationPartNum, validationPartPass } from "../JS_script/Validation_inter";

function LogIn(){

    const navigate = useNavigate();

    validationPartNum();
    validationPartPass();

    let handleform = (e)=>{
        e.preventDefault()
        let formdata = new FormData(e.target)
        let userData = Object.fromEntries(formdata.entries())
        fetch("http://127.0.0.1:5000/login",
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
                alert(data.message)
                localStorage.setItem("name",data.name)
                localStorage.setItem("course",data.course)
                localStorage.setItem("isSess",JSON.stringify(data.isSess.status))
                localStorage.setItem("role",data.role)
                data.role === "Students" ? navigate("/user_dashboard") : navigate("/admin_dashboard")
            }

            alert(data.message)
        })
        .catch(rej=>console.log("error"))
    }

    return(
        <>
            <div className={styles.box} id="logIn-box">
            <hgroup className={styles.heading}>
                <a href="#" className={styles.link}>{"<--"}</a>
                <h1>log in</h1>
                <p>don't have an account? <a onClick={()=>{navigate("/auth")}} id="signUp" className={styles.link}>signUp</a></p>
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
                    
                    <button className={styles.button}>login</button>
                </fieldset>
            </form>
            </div>

        </>
    )
}


export {LogIn}