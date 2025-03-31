const localHost = "https://backend-api-cn4x.onrender.com"

// fetch function to update value
function changefield(updatedActionObj){
      return fetch(`${localHost}/update`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify(
                                    updatedActionObj
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




function attendanceMap(method,course,rollnum=null){

    if(method === "GET" && course && rollnum){
        return fetch(`${localHost}/getAttedance?role=Students&course=${course}&rollNum=${rollnum}`)
        .then(data=> data.json())
    }
    if(method === "POST" && course){
        return fetch(`${localHost}/getAttedance?role=Teachers&course=${course}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"}
        })
        .then(data=>data.json())
    }

}


export {changefield,dBReadFields,logout,attendanceMap}

