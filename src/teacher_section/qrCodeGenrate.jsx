import { useEffect ,useRef,useState} from "react"
import Style from "./styling/loader.module.css"
import { changefield, dBReadFields } from "../JS_script/allFetch"
import { QRCodeCanvas } from "qrcode.react"
import html2canvas from "html2canvas"

function QrcodeGen({qrData}){

    let qrcodeRef = useRef(null)
    let [codeData,setCodeData] = useState(null)

    useEffect(()=>{
      dBReadFields("POST",{isSess:1})
    .then(data=>{
      let obj={...data.val.isSess}
       console.log(obj)
        if (obj.QrCodeData){
          setCodeData(obj.QrCodeData)
        }
        else{
          alert(data.message)
        }
      })
    },[])

  let downloadHandleClick = (e)=>{
    if(qrcodeRef.current){
      html2canvas(qrcodeRef.current).then((canvas)=>{
        const link = document.createElement("a")
        link.href = canvas.toDataURL('image/png')
        link.download = "qrcode.png"
        link.click()
      })
    }
  }

  function handleClick(){
    let newCode = Math.random().toString(36).substring(2,12)
    changefield({"$set":{"isSess.QrCodeData":newCode}}).then(data=>{
      if (data.status === "OK"){
        console.log(`new code generated and ${data.message}`)
      }
      else console.log(data.message,data.status + "/ngnerate new code again")
    }).catch(rej=> console.log(rej))
    setCodeData(newCode)
  }


    return(
        <>
        <div className={Style.loaderContainer}>
        
            <div ref={qrcodeRef} className={Style.displayContent}>
              <h4>this session qr-code</h4>
              <QRCodeCanvas  value={codeData} size={100} className={Style.Img_Element}/>
            </div>

            <div className={Style.buttonCollection}>
            <button onClick={downloadHandleClick}  className={Style.Button}>
              download as png
              </button>
              <button onClick={handleClick}  className={Style.Button}>
              generate new code
              </button>
            </div>
            
        </div>
        </>
    )

}



function Loader({color}){
  let Loaderheight = 30;
  let loaderwidth = Loaderheight ;
  let loaderColor = color ? color:"black" ;


  return(
    <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={Style.SVG_element}>
    <rect fill={loaderColor} stroke={loaderColor} stroke-width="15" width={loaderwidth} height={Loaderheight} x="25" y="85">
      <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
    </rect>
    <rect fill={loaderColor} stroke={loaderColor}stroke-width="15" width={loaderwidth} height={Loaderheight} x="85" y="85"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
    </rect>
    <rect fill={loaderColor} stroke={loaderColor} stroke-width="15" width={loaderwidth} height={Loaderheight} x="145" y="85"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
    </rect>
    </svg>
    </>
  )
}

export {QrcodeGen,Loader}