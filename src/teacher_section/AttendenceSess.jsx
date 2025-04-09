import { Link, Outlet, useLocation } from "react-router"
import { ManageStudent } from "./attendanceMultiScript/Manage"
import { useEffect, useState } from "react"
import { ToggleButtonGroup ,AccordionSummary,Accordion,Typography,accordionClasses} from '@mui/material';

function AttendSession(){
    let location = useLocation()
    let [target,setTarget] = useState('/')

    const handleChange=(event,value)=>{
        if(value !== null){
            setTarget(value);
        }
    }

        
    let containerStyle ={
        "backgroundColor":" var(--color-palet-type2-)",
        "display": "flex",
        "justifyContent": "center",
        "gap": "1rem",
        "boxSizing": "border-box",
        "padding":" .2rem 0 .4rem 0"
    
    }


    return(
        <>
        <div style={containerStyle}>
        <ToggleButtonGroup 
        value={target} 
        exclusive 
        aria-label="navigation" 
        onChange={handleChange}
        >

            <ToggleButton value="/" aria-label="left aligned" component={Link} to={""}>
                student
              </ToggleButton>
              <ToggleButton value="/ManageStudent" aria-label="center aligned" component={Link} to={"ManageStudent"}>
                manage
              </ToggleButton>
              <ToggleButton value="/history" aria-label="right aligned">
                history
              </ToggleButton>
            
        </ToggleButtonGroup>
        </div>
        <div id="content_field">
            <Outlet/>
        </div>
        
        </>
    )
}



export {AttendSession}