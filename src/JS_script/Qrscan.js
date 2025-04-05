import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { changefield ,attendanceMap} from "./allFetch";



function scollerFunction(element){
    element.scrollTop = element.scrollHeight
}

function elemntCreate(tag,className,text){
    let bit=document.createElement(tag)
    bit.className = className
    bit.innerText = text
    return bit
}

function elementDisplay(element,display){
    if (display === "y"){
        element.style.display = "block"
    }
    if(display === "n"){
        element.style.display = "none"
    }
}



function ScannerInstanceMorning(scanField,scrollElemnt){

    let html5QrCode = new Html5Qrcode("reader");

    elementDisplay(scanField,"y")
    scollerFunction(scrollElemnt)

    const qrCodeSuccessCallback_M = (decodedText, decodedResult) => {
        /* handle success */
       html5QrCode.stop().then(()=>{

        elementDisplay(scanField,"n");
        
        attendanceMap("GET",localStorage.getItem("course"),localStorage.getItem("userId"))
        .then(
            data=>{
                let obj = data.value[0].isSess.QrCodeData
                if (data.status === "OK" && obj === decodedText){
                    alert("correct qr code updating the result ..")

                    changefield({"$set":{"attendance_status.M":true}}).then(data=>{
                        if(data.status === "OK"){
                            localStorage.setItem("attendance",JSON.stringify({"M":true,"E":E}))
                            
                                alert('stopping the scaner attendance taken succefully')
                                html5QrCode.clear()
                            
                        }
                        else alert(`some error occured ..->${data.message}`)
                    }).catch(rej=> alert("attendance cant be set due to internal server error -> ",rej))
                    
                }
                else{
                    alert("wrong QrCode scan...")
                }
            }
        )
        .catch(rej=>console.log("server issue"))

       })
        
    
    
    };


    // and immediatly invoke function Expression
    (function CreateQRScanElemnt(){
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback_M);
    })();

    return;
}

function ScannerInstaceEvening(scanField,scrollElemnt){
    let html5QrCode = new Html5Qrcode("reader");

    elementDisplay(scanField,"y")
    scollerFunction(scrollElemnt)

    const qrCodeSuccessCallback_E = (decodedText, decodedResult) => {
        /* handle success */
        
        html5QrCode.stop().then(()=>{

            elementDisplay(scanField,"n")        
            attendanceMap("GET",localStorage.getItem("course"),localStorage.getItem("userId"))
            .then(
                data=>{
                    let obj = data.value[0].isSess.QrCodeData
                    if (data.status === "OK" && obj === decodedText){
                        alert("correct qr code updating the result ..")

                        changefield({"$set":{"attendance_status.E":true}}).then(data=>{
                            if(data.status === "OK"){
                                localStorage.setItem("attendance",JSON.stringify({"M":M,"E":true}))
                                alert('stopping the scaner status updated')
                                
                            }

                            else alert(`some error occured ..->${data.message}`)
                        }).catch(rej=> alert("attendance cant be set due to internal server error -> "))
            
                    }
                    else{
                        alert("wrong QrCode scan...")
                    }
                }
            )
            .catch(rej=>console.log("server issue"))

        })        
    
    };


    // and immediatly invoke function Expression
    (function CreateQRScanElemnt(){
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback_E);
    })();
    
    return;
}



function QrScanner(){


    useEffect(()=>{
        let scanField = document.querySelector("#reader");
        let test = document.querySelector("#scrollTrig")
        // let M_status_showElemnt = document.querySelector("#M-sndStatus")
        // let E_status_showElemnt = document.querySelector("#E-sndStatus")
                
        let currentHrs = new Date().getHours()
        currentHrs = 14
        document.addEventListener("click",(eve)=>{
        
            
            if( eve.target.matches("#M-Present") ){

                if( currentHrs>=10 && currentHrs <11 ){

                    ScannerInstanceMorning(scanField,test)
                    // scanField.appendChild(elemntCreate("button","stopScan","stop scan"))
                }
                else
                {
                    alert("only at designated time")
                }
                
            }
        
            else if(eve.target.matches("#E-Present")  ){

                if( currentHrs>=14  && currentHrs < 15){


                    ScannerInstaceEvening(scanField,test)
                    // scanField.appendChild(elemntCreate("button","stopScan","stop scan"))
                }
                else{
                    
                    alert("only at designated time")

                }

        
            }

            // when the stop button is clicked,we need to pause it so to do this we will use pause method
            if(eve.target.matches(".stopScan") ){
                eve.stopPropagation(); 
                console.log("hello",eve.target.innerText)
                if(eve.target.innerText==="stop scan")
                    {
                        console.log(true)
                        html5QrCode.pause();
                        eve.target.innerText="resume scan"
                    }
                    else{
                        console.log(false)
                        html5QrCode.resume()
                        eve.target.innerText="stop scan"
                    }
            }
        
        })
    },[])

    return "hello"

}

export {QrScanner}