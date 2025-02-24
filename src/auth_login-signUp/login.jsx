import { useNavigate } from "react-router";
import styles from "../styling/auth_style.module.css"
import { InputField } from "./signup"
import { useEffect } from "react";
import { validationPartNum, validationPartPass } from "../JS_script/Validation_inter";

function LogIn(){

    const naviage = useNavigate();

    function useNavigation(path){
        naviage(path)
    }

    validationPartNum();
    validationPartPass()

    return(
        <>
            <div className={styles.box} id="logIn-box">
            <hgroup className={styles.heading}>
                <a href="#" className={styles.link}>{"<--"}</a>
                <h1>log in</h1>
                <p>don't have an account? <a onClick={()=>{useNavigation("/auth")}} id="signUp" className={styles.link}>signUp</a></p>
            </hgroup>
            <form action="" className="form_field" id="logIn-form">
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

// function validationPart(){
//     useEffect(()=>{
//         let NumInput = document.querySelectorAll("input[type='number']");

// // validation of input of type numbers
// NumInput.forEach(input=>{
//     input.addEventListener("input",()=>{
//         if(!/^2200[0-9]0[0-9]00[0-9]{2}$/.test(input.value)){
//             input.setCustomValidity("not a valid roll-number");
//         }
//         else{
//             input.setCustomValidity("");
//         }
//     })
// })

//     },[])
// }

export {LogIn}