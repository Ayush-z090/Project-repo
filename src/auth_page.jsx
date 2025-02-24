import { useEffect } from "react";
import { Outlet } from "react-router"
function FormPage(){

    let Styles = {
        width: "100%",
        height: "100vh",
        background: "linear-gradient(var(--color-palet-type2-) 1rem, var(--color-palet-Bg-) 48rem)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };


    
   
    return(
        <>
            <div className="container" style={Styles}>
                <Outlet/>
            </div>

        </>
    )
}


export {FormPage}