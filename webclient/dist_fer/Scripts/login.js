
function Login(){
    var done=0;
    var usuario=document.login.usuario.value;
    var password=document.login.password.value;
    if (usuario=="admin" && password=="admin") {
        window.location="main.html";
    }
    else if (usuario=="" && password=="") {
        window.location="error.html";
    }
    else{
        //tirar error y resetear.
    }
}

document.oncontextmenu = function(){return false}
