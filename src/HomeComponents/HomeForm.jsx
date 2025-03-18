import { useEffect } from "react"
import { useNavigate } from "react-router"
import styles from "../styling/home.module.css"



function HomeForm(){

    const navigate = useNavigate();

    let handleChange = (e)=>{
        e.preventDefault()
        let formdata = new FormData(e.target)
        let userinfo = {
            "name":formdata.get("userName"),
            "email":formdata.get("userEmail"),
            "userRole":formdata.get("userRole")
        }
        sessionStorage.setItem("userForm_one_Data",JSON.stringify(userinfo))

        navigate("/auth")
    }

    validationPart()
    return(
        <>
            <form onSubmit={handleChange} className={styles.role_query} >
                <hgroup className={styles.hgroup}>
                    <h5>We just need a few details before getting you started</h5>
                </hgroup>
                <fieldset className={styles.fieldset}>

                    <InputField 
                    labelText="full name" 
                    inputId = "name" 
                    name="userName" 
                    type="text" 
                    pattern= "[a-zA-Z0-9_]+\s[a-zA-Z0-9_]+" 
                    inputValLen="18"
                    errorSpanText="wrong name"
                    
                    />
                    
                    <InputField 
                    labelText="email" 
                    inputId = "Email" 
                    name="userEmail" 
                    type="email" 
                    pattern= "[^@]+@gmail.com" 
                    inputValLen=""
                    errorSpanText="invalid Email"
                    />
                    
                    <div className={styles.role_drop_down}>
                        <select name="userRole" id="role" required>
                            <option value="" role="contentinfo">select your role</option >
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                    <button type="submit" id={styles.formButton}>submit</button>
                </fieldset>
            </form>

        </>
    )
}

function InputField(value){
    return(
        <>
            <div className={styles.input_field}>
                <label htmlFor={value.inputId}>{value.labelText}</label>
                <input type={value.type} name={value.name} id={value.inputId} required pattern={value.pattern} maxLength={value.inputValLen} />
                <span className={styles.invalid}>{value.errorSpanText}</span>
            </div>
        </>
    )
}

export {HomeForm}

function validationPart() {
    useEffect(() => {
        const name = document.getElementById("name");
        const email = document.getElementById("Email");

        name.addEventListener("input", () => {
            if (name.validity.patternMismatch) {
                name.setCustomValidity("First name and last name should be separated by space.");
            } else if (name.validity.valueMissing) {
                name.setCustomValidity("Name shouldn't be empty");
            } else {
                name.setCustomValidity("");
            }
            name.reportValidity();
        });

        email.addEventListener("input", () => {
            if (email.validity.patternMismatch) {
                email.setCustomValidity("Enter a valid Email");
            } else if (email.validity.valueMissing) {
                email.setCustomValidity("Field shouldn't be empty");
            } else {
                email.setCustomValidity("");
            }
            email.reportValidity();
        });

        return () => {
            name.removeEventListener("input", () => {});
            email.removeEventListener("input", () => {});
        };
    }, []);
    
}