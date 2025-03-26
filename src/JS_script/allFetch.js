const localHost = "https://backendapi-aexs.onrender.com"

// fetch function to update value
function changefield(updatedValue){
      return fetch(`${localHost}/update`,{
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

function blobLinkGenerate(url){
    return  fetch(url)
            .then(
            data=> data.blob()
            )
            .then(data =>URL.createObjectURL(data))
            

}

export {changefield,dBReadFields,logout,blobLinkGenerate}

