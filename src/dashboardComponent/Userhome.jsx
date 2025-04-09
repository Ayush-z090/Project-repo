import { useState } from "react"
import styles from "../styling/UserHome.module.css"
import { AccordionSummary,Accordion,Typography,AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function UserHome(){

    return(
        <>
            <div className={styles.homeSection} >
                <h1>
                    hello,
                    <span id="usrName">{localStorage.getItem("name")}</span>
                    <p>heres today class summary</p>
                </h1>
                <div className={styles.dropdown_trigger} id="classes-summary">
                <AccodiomDropdown/>
                </div>
            </div>

        </>
    )
}

export {UserHome}

function AccodiomDropdown() {
  let {M,E} =JSON.parse(localStorage.getItem("attendance"))


  let acorSty ={
    boxShadow:"0px 0px 3px 0px ",
    borderRadius:".45em",
    marginBottom:".2rem"
  }

  let typoSty={
    fontFamily:"poppins",
    textTransform:"uppercase"
  }

    return (
        <div>
          <Accordion 
          defaultExpanded
          sx={acorSty}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              
            >
              <Typography 
              component="span"
              sx={typoSty}
              >attendance status</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                  <div className={styles.attend} id="morning">
                      <p>morning
                         <span 
                         className={styles.status} 
                         id="morning-status">{M ? "Present":"Absent"}</span></p>
                  </div>
                  <div 
                  className={styles.attend} 
                  id="evening">
                      <p>Evening 
                        <span 
                        className={styles.status}
                        id="evening-status">
                        {E ? "Present":"Absent"}</span></p>
                  </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
          sx={acorSty}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography
               component="span"
               sx={typoSty}
               >classes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      );
}