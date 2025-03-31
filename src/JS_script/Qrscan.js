import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { changefield } from "./allFetch";

let attendance = JSON.parse(localStorage.getItem("attendance"))


const qrCodeSuccessCallback_E = (decodedText, decodedResult) => {
    /* handle success */
    alert(`E decded text : ${decodedText} , decoded result : ${decodedResult}`)

    changefield({"$set":{"attendance_status.E":true}}).then(data=>{
        console.log(data)
        if(data.status === "OK"){
            alert(`Your morning attendance ${data.message}`)
            localStorage.setItem("attendance",{"M":true,"E":attendance.E})
        }
        else console.log(`some error occured ..->${data.message}`)
    }).catch(rej=> console.log("attendance cant be set due to internal server error -> "))


};

const qrCodeSuccessCallback_M = (decodedText, decodedResult) => {
    /* handle success */
    alert(`M decded text : ${decodedText} , decoded result : ${decodedResult}`)

    changefield({"$set":{"attendance_status.M":true}}).then(data=>{
        console.log(data)
        if(data.status === "OK"){
            alert(`Your morning attendance ${data.message}`)
            localStorage.setItem("attendance",{"M":attendance.M,"E":true})
        }
        else console.log(`some error occured ..->${data.message}`)
    }).catch(rej=> console.log("attendance cant be set due to internal server error -> "))
    


};




function QrScanner(){

    useEffect(()=>{
        let scanField = document.querySelector("#reader");
        let html5QrCode = new Html5Qrcode("reader");
        let test = document.querySelector("#scrollTrig")
        // let M_status_showElemnt = document.querySelector("#M-sndStatus")
        // let E_status_showElemnt = document.querySelector("#E-sndStatus")

        function scollerFunction(element){
            element.scrollTop = element.scrollHeight
        }

        function CreateQRScanElemnt(succsesCallback){
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };
            html5QrCode.start({ facingMode: "environment" }, config, succsesCallback);
        }
        

        function elemntCreate(tag,className,text){
            let bit=document.createElement(tag)
            bit.className = className
            bit.innerText = text
            return bit
        }

        
        
        let currentHrs = new Date().getHours()
        currentHrs = 15
        document.addEventListener("click",(eve)=>{
        
            if(currentHrs < 10 || currentHrs > 16){
                alert("only at designated time")
            }
            else if(eve.target.matches("#M-Present") && currentHrs>=10 && currentHrs <=11){
                
                scollerFunction(test)
                CreateQRScanElemnt(qrCodeSuccessCallback_M)
                scanField.appendChild(elemntCreate("button","stopScan","stop scan"))
                    
        
            }
        
            else if(eve.target.matches("#E-Present") && currentHrs>=14 ){
                scollerFunction(test)
                CreateQRScanElemnt(qrCodeSuccessCallback_E)
                scanField.appendChild(elemntCreate("button","stopScan","stop scan"))

        
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


}

export {QrScanner}