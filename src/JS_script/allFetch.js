const localHost = "http://127.0.0.1:5000"

// fetch function to update value
function changefield(updatedValue){

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



// fetch function used to read value with method get or post

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
    
    return Promise.reject("something went wrong")
}


// function for logout

function logout(){
    return fetch(`${localHost}/logout`,{
        method:"GET",
        credentials:"include"
    }).then(res=> res.json())
}


export {changefield,dBReadFields,logout}

