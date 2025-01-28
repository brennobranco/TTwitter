const form = document.querySelector("#form")
const login_btn = document.querySelector(".entry-btn")
const eye = document.querySelectorAll(".bi")
const password = document.querySelector("#password")
const confirm_password = document.querySelector("#confirm-password")
const error_message = document.querySelectorAll(".error")
const data = document.querySelector("#data")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const confirm_password = document.querySelector("#confirm-password").value
    const data = document.querySelector("#data").value
    const checkbox = document.querySelector("#terms-checkbox")

    if (name.length < 3) {
        error_message[0].classList.add("display-error")
        return
    }
    else {
        error_message[0].classList.remove("display-error")
    }

    if (!verify_email(email)) {
        error_message[1].classList.add("display-error")
        return
    }
    else {
        error_message[1].classList.remove("display-error")
    }

    if (data.length < 10) {
        error_message[2].classList.add("display-error")
        return
    }
    else {
        error_message[2].classList.remove("display-error")
    }

    if (password.length < 6) {
        error_message[3].classList.add("display-error")
        return
    }
    else {
        error_message[3].classList.remove("display-error")
    }

    if (confirm_password != password) {
        error_message[4].classList.add("display-error")
        return
    }
    else {
        error_message[4].classList.remove("display-error")
    }

    if (!checkbox.checked) {
        error_message[5].classList.add("display-error")
        return
    }
    else {
        error_message[5].classList.remove("display-error")
    }

    window.location.href = "./app.html";
})

login_btn.addEventListener("click", () => {
    window.location.href = "./index.html";
})

eye.forEach(element => {
    element.addEventListener("click", function () {

        const input = this.parentElement.querySelector('.form-control')

        if (input.type === 'password') {
            input.setAttribute('type', 'text')
            this.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
        }
        else {
            input.setAttribute('type', 'password')
            this.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
        }
    })
});

data.addEventListener("input", () => {
    let formatador = data.value

    if (isNaN(formatador[formatador.length - 1])) {
        data.value = formatador.slice(0, -1)
        return
    }

    if (formatador.length == 3) {
        formatador = formatador.slice(0, 2) + "/" + formatador.slice(2);
    }
    if (formatador.length == 5) {
        formatador = formatador.slice(0, 5) + "/" + formatador.slice(5, 9);
    }

    data.value = formatador;
})

function verify_email(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}