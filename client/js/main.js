let ul = document.querySelector('#names');
let input = document.querySelector('#filterInput')
let text = '';
let form = document.querySelector('#form')
let alert = document.querySelector('.alert')
let modal = document.querySelector('#exampleModalCenter')

//All Contacts
getAll().then((data) => {
    data.forEach(e => {
        let id = e._id;
        text += '<li class="colection-item">'+
        '<a href="#" onclick="deleteContact(\''+ id +'\')" class="delete"><i class="fas fa-times-circle"></i></a>'+
            ' <span class="names" >'+e.firstName+'  '+e.lastName+ '<span class="numbers">'+e.phone+'</span></span>'+
             
        '</li>'

     })
     ul.innerHTML = text;       

     input.addEventListener('keyup', () =>{            
        if(input.value.length >= 2){
            let inputValue = input.value.toUpperCase();
            let filterSearch = data.filter(el => el.lastName.toUpperCase().includes(inputValue))
            let filterText ='';
            
            filterSearch.forEach(e => {
            filterText += `
            <li class="colection-item">
                    <a class="names" href="#" > `+e.lastName+` <span class="numbers">`+e.phone+`</span></a>
            </li>`
            })     
 
            ul.innerHTML = filterText;           
                }else{
                ul.innerHTML = text;
            }
     })  
}).catch((err) => {
    console.log(`Error ${err}`);
    
})

//Add Contact
form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let firstName = getInputValue('firstname')
    let lastName = getInputValue('lastname')
    let phone = getInputValue('phone')

    let newContact = {
        'firstName' : firstName,
        'lastName' : lastName,
        'phone' : phone
    }
    fetch('http://localhost:5000/api/users/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newContact)
    })
    .then((res) =>{
        if(res.status === 200){

            return res.json()
        }else{
            throw Error('Unable to fetch users')
        }
    }).catch((err) => {
        console.log(`Error ${err}`);
        
    }) 
   alert.style.display = 'block';
   //Hide Aler after 1 s
   setTimeout(function(){
    alert.style.display = 'none';
},1000)

   form.reset()
   setTimeout(function(){
    modal.style.display = 'none';
    window.location.reload();
    },2000)
}) 

function getInputValue(id){
    return document.getElementById(id).value
}

//Delete Contact
function deleteContact(id){
         
    fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(id)
    })
    .then((res) =>{
        if(res.status === 200){

            return res.json()
        }else{
            throw Error('Unable to fetch users')
        }
    }).catch((err) => {
        console.log(`Error ${err}`);
        
    }) 
    setTimeout(function(){
        window.location.reload();
        },500)
}



