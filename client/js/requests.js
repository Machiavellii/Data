const getAll = () => {

    return fetch('http://localhost:5000/api/users', {
        method: 'GET'
    })
    .then((res) =>{
        if(res.status === 200){
            return res.json()
        }else{
            throw Error('Unable to fetch users')
        }
    })
}

