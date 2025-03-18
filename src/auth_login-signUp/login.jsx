import { useNavigate } from "react-router";
import styles from "../styling/auth_style.module.css"
import { InputField } from "./signup"
import { useEffect } from "react";
import { validationPartNum, validationPartPass } from "../JS_script/Validation_inter";

function LogIn(){

    const navigate = useNavigate();
    let path_direct_to = ""

    validationPartNum();
    validationPartPass();

    let handleform = (e)=>{
        e.preventDefault()
        let formdata = new FormData(e.target)
        let userData = {
            "_userId":formdata.get("userId"),
            "_userPassword" : formdata.get("userPassword")
        }
        console.log(userData)

        path_direct_to === "student" ? navigate("/user_dashboard") : navigate("/admin_dashboard")
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
                        name="userId"
                        id="userId"
                        type="number"
                    />

                    <InputField 
                        labelText ="Password" 
                        name="userPassword"
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