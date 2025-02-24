import { useEffect } from "react";

function validationPartNum(){
    useEffect(()=>{
        let NumInput = document.querySelectorAll("input[type='number']");

// validation of input of type numbers
NumInput.forEach(input=>{
    input.addEventListener("input",()=>{
        if(!/^2200[0-9]0[0-9]00[0-9]{2}$/.test(input.value)){
            input.setCustomValidity("not a valid roll-number");
        }
        else{
            input.setCustomValidity("");
        }
    })
})

    },[])
}

function validationPartPass(){
    
    useEffect(()=>{

        // selets all input of type password..

        let strInput = document.querySelectorAll("input[type='password']");
        // validation of input of type password
strInput.forEach(input=>{
    input.addEventListener("input",(ele)=>{
    // we dont want to use add confirm password add listener here so just skip with this below if statement
    if(ele.target.matches("#userConfirmPassword"))
    {
        console.log(/^[a-zA-Z0-9@#$%&*_-]{5,}$/.test(input.value));
        return;
    }
    // validation starts
    if(!/^[a-zA-Z0-9@#$%&*_-]{5,}$/.test(input.value)){
        
        input.setCustomValidity("Password is too short or invalid(contain alphabet,number and symbol length>8) ");
    }
    else{
        input.setCustomValidity("");
    }
    })
})

    },[])
}

function conftirmPasword(){

    useEffect(()=>{

        let strInput = document.querySelectorAll("input[type='password']");

        strInput[1].addEventListener("input",()=>{
            if(strInput[1].value !== strInput[0].value){
                strInput[1].setCustomValidity("password didnt match")
                strInput[1].parentElement.style.border ="1px solid red"
            }
            else{
                strInput[1].setCustomValidity("")
                strInput[1].parentElement.style.border ="1px solid var(--color-palet-type2-)"
            }
        })
    })
}

export {validationPartNum,validationPartPass,conftirmPasword}