const add_friend = document.querySelectorAll(".add-friend")
const post_area = document.querySelector(".posts-area")
const form = document.querySelector("#post-form")
const no_funcionality_element = document.querySelectorAll(".noFuncionality")
let index = 1

window.addEventListener("load", updateText);
window.addEventListener("resize", updateText);

// Troca o texto e o estilo do botão de adicionar amigos ao ser clicado
add_friend.forEach(element => {
    element.addEventListener("click", function () {
        if (this.textContent === "Adicionar") {
            this.classList.toggle("cancel")
            this.textContent = "Cancelar"
        }
        else {
            this.classList.toggle("cancel")
            this.textContent = "Adicionar"
        }
    })
})

// Verificação de formulário para posts
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const textArea = document.querySelector("#text-area").value
    const imgInput = document.querySelector("#image")
    const imgFile = imgInput.files[0]

    if (textArea.trim() == "" && !imgFile) // Evita que gere posts sem informação
        return

    const newPost = document.createElement('div') // Cria um novo post
    newPost.classList.add('post') // Adciona estilo ao novo post
    newPost.setAttribute("id", index) // Atribiu um id ao post

    if (imgFile) {
        // Renderiza a imagem e adiciona post na tela
        const reader = new FileReader()
        reader.addEventListener("load", function (e) {
            post_with_img(newPost, e.target.result, textArea, index)
            post_area.appendChild(newPost)
            index++
        })
        reader.readAsDataURL(imgFile)
    }
    else {
        // Adiciona um novo post sem imagem na tela
        post_without_img(newPost, textArea, index)
        post_area.appendChild(newPost)
        index++
    }

    form.reset() // Reseta o formulário
})

// Essa função cria o conteúdo do post com imagem
function post_with_img(newPost, imgSrc, texto, id) {
    newPost.innerHTML = `<img src="${imgSrc}" alt="imagem do post">
                <div class="interactive-container">
                    <div class="user-container">
                        <div class="imagem"></div>
                        <h3>@usuário</h3>
                    </div>
                    <div class="post-icons-container">
                        <i class="bi bi-chat-dots" onclick="noFuncionality()"></i>
                        <i class="bi bi-hand-thumbs-up" onclick="changeLikeColor('${id}')"></i>
                        <i class="bi bi-heart" onclick="changeLoveColor('${id}')"></i>
                    </div>
                </div>
                <p>${texto}</p>
                <i class="bi bi-x" onclick="removePost('${id}')"></i>`
}

// Essa função cria o conteúdo do post sem imagem
function post_without_img(newPost, texto, id) {
    newPost.innerHTML = `<p>${texto}</p>
    <div class="interactive-container">
                    <div class="user-container">
                        <div class="imagem"></div>
                        <h3>@usuário</h3>
                    </div>
                    <div class="post-icons-container">
                        <i class="bi bi-chat-dots" onclick="noFuncionality()"></i>
                        <i class="bi bi-hand-thumbs-up" onclick="changeLikeColor('${id}')"></i>
                        <i class="bi bi-heart" onclick="changeLoveColor('${id}')"></i>
                    </div>
                </div>
                <i class="bi bi-x" onclick="removePost('${id}')"></i>`
}

// Muda a cor do Like ao ser clicado
function changeLikeColor(id) {
    const post = document.getElementById(id)
    const icon = post.querySelector(".bi-hand-thumbs-up")

    icon.classList.toggle('like')
}

// muda a cor do Amei ao ser clicado
function changeLoveColor(id) {
    const post = document.getElementById(id)
    const icon = post.querySelector(".bi-heart")

    icon.classList.toggle('love')
}

// Remove um post
function removePost(id) {
    post = document.getElementById(id)
    if (window.innerWidth > 600) {
        post.style.animation = "deleteDesktop 0.3s forwards"
    } else {
        post.style.animation = "deleteMobile 0.3s forwards"
    }
    setTimeout(() => {
        post.remove()
    }, 300)
}

// Atualiza o texto da área de adicionar amigos conforme a dimensão da tela 
function updateText() {
    const text = document.querySelector(".friends-box").querySelector("h1")
    if (window.innerWidth <= 1100) {
        text.innerText = "Talvez você conheça"
    }
    else {
        text.innerText = "Pessoas que você talvez conheça"
    }
}

no_funcionality_element.forEach(element => {
    element.addEventListener("click", () => {
        noFuncionality()
    })
})

function noFuncionality() {
    window.alert("Funcionalidade não implementada")
}