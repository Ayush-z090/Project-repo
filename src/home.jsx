import { Outlet } from "react-router"
import { HomeContent } from "./HomeComponents/Homecontent"
import { HomeForm } from "./HomeComponents/HomeForm"
import { useEffect } from "react"


function Home(){

    const styles = {
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
        padding: "7rem 0.6rem 2.9rem 0.6rem",
        position: "relative",
        backgroundColor: "var(--color-palet-Bg-)",
        fontFamily: '"Kelly Slab", serif'
      };
      
    
    // useEffect(()=>{
    //     import("./home.css")
    // })

    return(
        <>
            <div style={styles}>
                <Outlet/>
            </div>
        </>
    )
}





export {Home,HomeContent,HomeForm}












// // {/* <script>
        
        
    // </script> */}
