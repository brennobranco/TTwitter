const form = document.querySelector("#form")
const register_btn = document.querySelector(".register-btn")
const eye = document.querySelector(".bi")
const error_message = document.querySelectorAll(".error")
const forget_password = document.querySelector(".forget-password")

//Validação de formulário de login
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    if (!verify_email(email)) {
        error_message[0].classList.add("display-error")
        return
    }
    else {
        error_message[0].classList.remove("display-error")
    }

    if (password.length < 6) {
        error_message[1].classList.add("display-error")
        return
    }
    else {
        error_message[1].classList.remove("display-error")
    }

    window.location.href = "./app.html"; // Redireciona para a página principal
})

register_btn.addEventListener("click", () => {
    window.location.href = "./cadastro.html"; // Redireciona para a página de cadastro
})

// Possibilita que o usuário veja a senha e oculte novamente
eye.addEventListener("click", () => {
    const password = document.querySelector("#password")

    if (password.type === 'password') {
        password.setAttribute('type', 'text')
        eye.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
    }
    else {
        password.setAttribute('type', 'password')
        eye.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
    }
})

forget_password.addEventListener("click", () => {
    window.alert("Funcionalidade não implementada.")
})

// Verifica o formato do email
function verify_email(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}