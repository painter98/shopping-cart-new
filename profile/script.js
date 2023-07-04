

let curruser = JSON.parse(sessionStorage.getItem('currUser'));

let newusers = JSON.parse(sessionStorage.getItem('users'));

console.log(newusers,curruser);
let cart = document.getElementById('cart');

if(sessionStorage.getItem('currUser')){
    cart.style.display = "inline";
}
else  {
   cart.style.display = "none";
}


document.getElementById('btn1').addEventListener('click',()=>{
    console.log('hii');
    let firstname = document.getElementById('pfname').value;
    let lastname = document.getElementById('plname').value;

    if(firstname != '' && lastname != ''){
        curruser.fname = firstname;
        curruser.lname = lastname;
    
    
        sessionStorage.setItem('currUser',JSON.stringify(curruser));
    
        newusers.forEach((user)=>{
            if(user.mail === curruser.mail){ //finding targeting object using mail id and change first and last name
                user.fname = firstname;
                user.lname = lastname;
            }
        })
        sessionStorage.setItem('users',JSON.stringify(newusers));
    }
    else{
        alert('please enter firstname and lastname'); //empty inputs
    }

});

document.getElementById('btn2').addEventListener('click',()=>{
    let oldpassword = document.getElementById('op').value;
    let newpassword = document.getElementById('np').value;
    let conpassword = document.getElementById('cnp').value;

    if(oldpassword != '' && newpassword != '' && conpassword != '' && newpassword == conpassword && oldpassword == curruser.pwd)
    {
        console.log('changing password');
        newusers.forEach((user)=>{ //iterating through users data and finding targeted object
            if(user.pwd == curruser.pwd){
                user.pwd = newpassword; //change password
            }
        })
        curruser.pwd = newpassword; //change password

        sessionStorage.setItem('currUser',JSON.stringify(curruser));
        sessionStorage.setItem('users',JSON.stringify(newusers));
    }  
    else if(oldpassword == '' || newpassword == '' || conpassword == ''){ //empty fields 
        alert('Do not leave passwords input empty');
    }  
    else if(newpassword != conpassword){ //passwords of new and confirm does not match
        alert('new password and confirm password do not match');
    }
    else if(oldpassword != curruser.pwd){ //password provided does not match the database
        alert('old password provided is wrong');
    }

});

document.getElementById('btn3').addEventListener('click',()=>{ //logging out the current user
    sessionStorage.removeItem('currUser'); //remove data of current user from local storage
    window.location.href = '../index.html'; ///redirecting to the homepage
})
