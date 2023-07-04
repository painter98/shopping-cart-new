
let cart = document.getElementById('cart');
let homepage = document.getElementById('homepage');

if(sessionStorage.getItem('currUser')){
    cart.style.display = "inline";
    homepage.style.display = "inline";
}
else  {
   cart.style.display = "none";
   homepage.style.display = "none";
}


document.getElementById('log-btn').addEventListener('click',(e)=>{
    e.preventDefault();

    let currentUser = JSON.parse(sessionStorage.getItem('currUser'));
    
    if(sessionStorage.getItem('currUser')){
        alert("You are already logged in with Email Id "+ currentUser.mail);
        return;
    }

    let mail = document.getElementById('log-mail').value; //get input values
    let pwd = document.getElementById('log-pwd').value;

   /* console.log(mail,pwd);
    console.log(sessionStorage.getItem('users'))*/
    let curruser = JSON.parse(sessionStorage.getItem('users')).filter((user)=>{ //search in users array to know current login mail exists 
        return user.mail==mail;
    });
    console.log(curruser);
    if(curruser.length==0 && mail!='' && pwd!=''){ //for new users who trying to login without signing up
        console.log('sign in');
        alert('User has not signed up yet. Please signup to continue');
    }

    //console.log(curruser[0].mail,curruser[0].pwd);
    if(curruser[0].mail == mail && curruser[0].pwd == pwd) { //login the user go to shop web page
        console.log('redirecting');
        sessionStorage.setItem('currUser',JSON.stringify(curruser[0])); //update current user in localstorage whenever an user logs in
        window.location.href = '../shop';
    }
    else if(curruser[0].mail != mail && curruser[0].pwd == pwd || curruser[0].mail == mail && curruser[0].pwd != pwd) { //wrong password or mail id
        alert('wrong credentials');
    }
})
