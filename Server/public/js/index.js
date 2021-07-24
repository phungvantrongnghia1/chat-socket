var socket = io();

const modalRegister = document.getElementById("form-modal-register");
const modalLogin = document.getElementById("form-modal-login");
function tranformModal(){
    modalRegister.classList.toggle("show");
    modalRegister.classList.toggle("hidden");
    modalLogin.classList.toggle("show");
    modalLogin.classList.toggle("hidden");
}


