import { AccordionSummary,Accordion,Typography,AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


let acorSty ={
    boxShadow:"0px 0px 3px 0px ",
    borderRadius:".45em",
    marginBottom:".2rem",
    backgroundColor :"transparent"
  }

let typoSty={
fontFamily:"poppins",
textTransform:"uppercase",

}    


function List_Element_default({title,Elements}){
    return(
        <>
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
              >{title}</Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={
                    {
                        padding:"0 0.2rem"
                    }
                }
            >
              <Typography>
                {Elements}
              </Typography>
            </AccordionDetails>
        </Accordion>

        </>
    )
}

function List_Element({title,Elements}){
    return(
        <>
         <Accordion 
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
              >{title}</Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={
                    {
                        padding:"0 0.2rem"
                    }
                }
            >
              <Typography>
                {Elements}
              </Typography>
            </AccordionDetails>
        </Accordion>

        </>
    )
}


export {List_Element_default,List_Element}