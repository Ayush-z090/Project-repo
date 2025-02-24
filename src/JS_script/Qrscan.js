import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { data } from "react-router";



const qrCodeSuccessCallback_E = (decodedText, decodedResult) => {
    /* handle success */
    alert(`E decded text : ${decodedText} , decoded result : ${decodedResult}`)
    //         fetch("https://your-server.com/api/store-scan", { // Replace with your backend
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ 
//                 scannedCode: decodedText, 
//                 user: userData // Send user info along with the scan
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             alert("Data stored successfully!");
//         })
//         .catch(error => {
//             alert("Error sending data: " + error);
//         });

};

const qrCodeSuccessCallback_M = (decodedText, decodedResult) => {
    /* handle success */
    alert(`M decded text : ${decodedText} , decoded result : ${decodedResult}`)
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
        
            // else if(eve.target.matches("#M-Absent")){
            //     M_status_showElemnt.innerText ="status: Absent"
            //     console.log(sessionStorage.setItem("test","true"))
            //     console.log(sessionStorage.getItem("test"))
            // }
            // else if(eve.target.matches("#E-Absent")){
            //     M_status_showElemnt.innerText ="status: Absent"
            // }
        })
    },[])


}

export {QrScanner}