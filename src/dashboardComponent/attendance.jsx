import { useEffect, useState } from "react"
import { QrScanner } from "../JS_script/Qrscan"
import styles from "../styling/Attendance.module.css"

export function Attendance(){


    QrScanner()
    return(
        <>
            <div className={styles.attendence_marking_field}>
        
                <div className={styles.attendence_content} id="scrollTrig">
                    <Interface/>
                    <QrScanElemnt/>
                </div>
                
            </div>

        </>
    )
}

function Interface(){

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
                            <button className={styles.markPresent} id="E-Present">mark me present</button>
                            <button className={styles.markAbsent} id="E-Absent">mark me absent</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}
import "../styling/QrElemnt.css"
import { attendanceMap } from "../JS_script/allFetch"

function QrScanElemnt(data){

    return(
        <>
            <div id="reader" className=".reader" style={{display:"none"}}></div>

        </>
    )
}

