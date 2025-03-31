import { useState } from "react"
import { QrScanner } from "../JS_script/Qrscan"
import styles from "../styling/Attendance.module.css"

export function Attendance(){

    const [state,setState] = useState(true)

    QrScanner()
    return(
        <>
            <div className={styles.attendence_marking_field}>
        
                <div className={styles.attendence_content} id="scrollTrig">
                    <Interface setState={setState} state={state}/>
                    <QrScanElemnt state={state}/>
                </div>
                
            </div>

        </>
    )
}

function Interface(data){

    return(
        <>
            <div className={styles.showed_content}>
                <div className={styles.userDetails}>
                    <span className={styles.image}></span>
                    <div className="details-box">
                        <p id="name">{localStorage.getItem("name")}</p>
                        <p id="email">{localStorage.getItem("email")}</p>
                    </div>
                </div>
                <hgroup className={styles.headings}>
                    <h1>attendence summary</h1>
                </hgroup>
                <div className="attendance-menupulation-field">
                    <div className={styles.box} id="morning-status">
                        <h1>
                            M <span id="M-sndStatus"> status: pending</span>
                        </h1>
                        <div className={styles.buttons}>
                            <button className={styles.markPresent} id="M-Present">mark me present</button>
                            <button className={styles.markAbsent} id="M-Absent">mark me absent</button>
                        </div>
                    </div>
                    <div className={styles.box} id="evening-status">
                        <h1>
                            E <span id="E-sndStatus"> status: pending</span>
                        </h1>
                        <div className={styles.buttons}>
                            <button className={styles.markPresent} id="E-Present" onClick={()=>{data.setState(!data.state)}}>mark me present</button>
                            <button className={styles.markAbsent} id="E-Absent">mark me absent</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}
import "../styling/QrElemnt.css"

function QrScanElemnt(data){
    let styless;
     { styless = data.state?{display :"none"}:{display:"block"}}

    return(
        <>
            <div id="reader" className=".reader" style={styless}></div>

        </>
    )
}

