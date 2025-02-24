import { useNavigate } from "react-router"
import styles from "../styling/auth_style.module.css"
import { conftirmPasword, validationPartNum, validationPartPass } from "../JS_script/Validation_inter";

function SignUp(){

    const naviage = useNavigate();

    function useNavigation(path){
        naviage(path)
    }

    validationPartNum()
    validationPartPass()
    conftirmPasword()
    
    return(
        <>
            <div className={styles.box} id="signIn-box">
                <hgroup className={styles.heading}>
                    <a href="#" className={styles.link}>{"<--"}</a>
                    <h1>sign up</h1>
                    <p>already have a account? <a onClick={()=>{useNavigation("./login")}} className={styles.link}id="login" >login</a></p>
                </hgroup>
                <form action="" className={styles.form_field} id="signUp-form">
                    <fieldset className={styles.fieldset} aria-required="true">
                        <InputField 
                            labelText= "user id" 
                            type="number" 
                            id="UserId"
                            name="dataUserId"
                            />
                        
                        <div className={styles.role_drop_down}>
                            <label htmlFor="role">Course</label>
                            <select name="dataUserRole" className={styles.role} id="role" required>
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
                            name="dataUserPassword"
                        />

                        <InputField 
                            labelText= "password" 
                            type="password" 
                            id="confirmUserPassword"
                            
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