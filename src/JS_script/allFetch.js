const localHost = "http://127.0.0.1:5000"


function changeSession(updatedValue){

      return fetch("http://127.0.0.1:5000/update",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify(
                                    updatedValue
                            )
            })
            .then(res=> res.json())
            .then(data=> data)

}


function dBReadFields(useMethod,passedData=null) {
    
    if(!passedData && useMethod === "GET")
    {
        return fetch(`${localHost}/read`,{
        method:useMethod,
        credentials:"include",
        headers:{"Content-Type":"application/json"}
    })
    .then(res=> res.json())
    .then(data=>data)
    }
    if(passedData && useMethod === "POST")
    {
        return fetch(`${localHost}/read`,{
            method:useMethod,
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(passedData)
        })
        .then(res=> res.json())
        .then(data=> data)
    }
    

}

export {changeSession,dBReadFields}
