
let id=0;


let users = JSON.parse(sessionStorage.getItem('users')) || [];
let curruser = {};
let homepage = document.getElementById('homepage');
if(sessionStorage.getItem('currUser')){
     homepage.style.display = "inline";
     profile.style.display = "inline";
}
else  {
    homepage.style.display = "none";
    profile.style.display = "none";
}


document.getElementById('sign-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    
    if(localStorage.getItem('currUser')){
        alert("Log out to sign up as user");
        return;
    }

    console.log('signup');
    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let mail = document.getElementById('mail').value;
    let pwd = document.getElementById('pwd').value;
    let conpwd = document.getElementById('conpwd').value;
    let msg = document.getElementById('msg');
    console.log(pwd,fname,lname,mail,conpwd);

    let user = users!='' ? JSON.parse(sessionStorage.getItem('users')).filter((user)=>{
        return user.mail==mail;
    }):'';

    if(fname=='' || lname=='' || mail=='' || pwd=='' || conpwd==''){
        msg.innerText = 'Each input is mandatory';
    }
    else if(pwd!==conpwd){
        msg.innerText = 'passwords does not match';
    }
    else if(user!=''){
        console.log('login');
        msg.innerText = 'User already exists login instead';
    }
    else{
        curruser = {
            id,
            fname,
            lname,
            mail,
            pwd,
            conpwd
        }
        console.log(curruser);
        users.push(curruser);
        curruser.token = accessToken();
    
        sessionStorage.setItem('users',JSON.stringify(users));
        sessionStorage.setItem('currUser',JSON.stringify(curruser));
        msg.innerText = 'Successfully signed up, you can login now';
        id++;
    }
    
})

function accessToken(){
    let str = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}:"/.,';
    let token='';

    for(let i=0;i<16;i++){
        token += str[Math.floor(Math.random()*str.length)];
    }
    return token;
}
