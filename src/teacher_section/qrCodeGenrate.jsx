import { useEffect ,useRef,useState} from "react"
import Style from "./styling/loader.module.css"
import { blobLinkGenerate } from "../JS_script/allFetch"


function QrcodeGen({qrData}){

    const qreRef = useRef(null)
    const [loader,setLoader] = useState(false)
    let [apiUrl,setApiUrl] = useState(`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${"newCode"}&format=png`)
    const [blobUrl,setBlobUrl] = useState(null)
  
    const handleClick = (e)=>{
      let newCode =  Math.random().toString(36).substring(2,12)
      setApiUrl(`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${newCode}&format=png`)
      blobLinkGenerate(apiUrl)
      .then(value=>{setBlobUrl(value)})
      console.log(blobUrl)
    }
  

    if (apiUrl){
      useEffect(()=>{
      blobLinkGenerate(apiUrl)
      .then(value=>{setBlobUrl(value)})
      console.log(blobUrl)
    },[])
  }



    return(
        <>
        <div className={Style.loaderContainer}>
        
            <div className={Style.displayContent}>
              <h4>this session qr-code</h4>
            <img ref={qreRef} src={apiUrl} alt="loading" className={Style.Img_Element}/>
            </div>

            <div className={Style.buttonCollection}>
            <a download="qrcode.png" href={blobUrl} className={Style.Button}>
              download as png
              </a>
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