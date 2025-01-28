const add_friend = document.querySelectorAll(".add-friend")
const post_area = document.querySelector(".posts-area")
const form = document.querySelector("#post-form")
let index = 1

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

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const textArea = document.querySelector("#text-area").value
    const imgInput = document.querySelector("#image")
    const imgFile = imgInput.files[0]

    if (textArea.trim() == "")
        return

    const newPost = document.createElement('div')
    newPost.classList.add('post')
    newPost.setAttribute("id", index)

    if (imgFile) {
        const reader = new FileReader()
        reader.addEventListener("load", function (e) {
            post_with_img(newPost, e.target.result, textArea, index)
            post_area.appendChild(newPost)
            index++
        })
        reader.readAsDataURL(imgFile)
    }
    else {
        post_without_img(newPost, textArea, index)
        post_area.appendChild(newPost)
        index++
    }

    form.reset()
})


function post_with_img(newPost, imgSrc, texto, id) {
    newPost.innerHTML = `<img src="${imgSrc}" alt="imagem do post">
                <div class="interactive-container">
                    <div class="user-container">
                        <div class="imagem"></div>
                        <h3>@usuário</h3>
                    </div>
                    <div class="post-icons-container">
                        <i class="bi bi-chat-dots" ></i>
                        <i class="bi bi-hand-thumbs-up" onclick="changeLikeColor('${id}')"></i>
                        <i class="bi bi-heart" onclick="changeLoveColor('${id}')"></i>
                    </div>
                </div>
                <p>${texto}</p>
                <i class="bi bi-x" onclick="removePost('${id}')"></i>`
}

function post_without_img(newPost, texto, id) {
    newPost.innerHTML = `<p>${texto}</p>
    <div class="interactive-container">
                    <div class="user-container">
                        <div class="imagem"></div>
                        <h3>@usuário</h3>
                    </div>
                    <div class="post-icons-container">
                        <i class="bi bi-chat-dots"></i>
                        <i class="bi bi-hand-thumbs-up" onclick="changeLikeColor('${id}')"></i>
                        <i class="bi bi-heart" onclick="changeLoveColor('${id}')"></i>
                    </div>
                </div>
                <i class="bi bi-x" onclick="removePost('${id}')"></i>`
}

function changeLikeColor(id) {
    const post = document.getElementById(id)
    const icon = post.querySelector(".bi-hand-thumbs-up")

    icon.classList.toggle('like')
}

function changeLoveColor(id) {
    const post = document.getElementById(id)
    const icon = post.querySelector(".bi-heart")

    icon.classList.toggle('love')
}

function removePost(id) {
    post = document.getElementById(id)
    post.style.animation = "delete 0.3s forwards"
    setTimeout(() => {
        post.remove()
    }, 300)
}