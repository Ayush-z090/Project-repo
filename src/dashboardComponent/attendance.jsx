import { useEffect, useState } from "react"
import { QrScanner } from "../JS_script/Qrscan"
import styles from "../styling/Attendance.module.css"
import {Button} from "@mui/material"

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

    let {M,E} = JSON.parse(localStorage.getItem("attendance"))
    console.log(M,E)
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
                            Morning
                            <span id="M-sndStatus"> status: { M ?"present":"pending"}</span>
                        </h1>
                        <Button
                            variant="outlined" 
                            id="M-Present">
                                Scan
                        </Button>
                    </div>
                    <div className={styles.box} id="evening-status">
                        <h1>
                            Evening
                            <span id="E-sndStatus"> status: { E ?"present":"pending"}</span>
                        </h1>
                        <Button
                            variant="outlined" 
                            id="E-Present">
                                Scan
                        </Button>
                    </div>
                </div>
            </div>

        </>
    )

}
import "../styling/QrElemnt.css"

function QrScanElemnt(){

    return(
        <>
            <div id="reader" className=".reader" style={{display:"none"}}></div>

        </>
    )
}

