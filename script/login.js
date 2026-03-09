document.getElementById("login-btn").addEventListener('click',()=>{
    console.log("clicked")
    const user =document.getElementById("username").value;
    const pass =document.getElementById("password").value;
    const error = document.getElementById("alert");
    error.classList.add("hidden")
    if(user === 'admin' && pass ==='admin123'){
        window.location.assign("home.html")
    }else{
        error.classList.remove("hidden")
    }
})