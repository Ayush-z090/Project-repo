import { useEffect } from "react";

function addElment(sno,rollNum){
    // let Node =(   
    //     <form className={styles.studentAddForm}>
    //         <ul>
    //         <li>s{sno}</li>
    //         <li> <input type="number" value={rollNum} readOnly/></li>
    //         <li><button>remove</button></li>
    //         </ul>
    //     </form>
    // )
    useEffect(()=>{
        let CLickTarget = document.getElementById("clickTarget");
        let AddELemntTarget = document.getElementById("addElementField")
        CLickTarget.addEventListener("click",()=>{
                AddELemntTarget.appendChild(Node)
        })

    },[sno,rollNum])
}

function createElement(){
    let formStyle ={}
    let uiStyle = {}
    let liStyle ={}
    let form = document.createElement("form")
    let ul = document.createElement("ul")
    let li = document.createElement("li")
    let button = document.createElement("button")
    form.appendChild(ul)
    for(let i of [1,2,3]){
        ul.appendChild(li)
        if(i===3){
            li.appendChild(button)
        }
    }

}

export {addElment}