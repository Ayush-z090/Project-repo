import { Link, Outlet } from "react-router"
import { ManageStudent } from "./attendanceMultiScript/Manage"
import { useEffect } from "react"

function AttendSession(){
    let containerStyle ={
        "backgroundColor":" var(--color-palet-type2-)",
        "display": "flex",
        "justifyContent": "center",
        "gap": "1rem",
        "boxSizing": "border-box",
        "padding":" .4rem 0 .8rem 0"
    
    }

    let ButtonStyle ={
        "padding": ".4rem 1rem",
    "backgroundColor":" rgba(255, 255, 255, 0.459)",
    "color": "var(--color-palet-text-)",
    "borderRadius": ".5rem",
    "border": "none",
    "fontFamily": "poppins",
    "textTransform": "capitalize",
    "textDecoration":"none"
    }
    


    return(
        <>
        <div style={containerStyle}>
            <Link to={""} style={ButtonStyle}>studens</Link>
            <Link to={"ManageStudent"} style={ButtonStyle}>manage</Link>
            <Link style={ButtonStyle}>history</Link>
        </div>
        <div id="content_field">
            <Outlet/>
        </div>
        </>
    )
}




export {AttendSession}