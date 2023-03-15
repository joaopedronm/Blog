const url = "https://jsonplaceholder.typicode.com/posts"
// const url = "https://jsonplaceholder.typicode.com/posts?userId=1"

const loadingElement = document.querySelector("#loading")
const postsContainer = document.querySelector("#posts-container")

const postPage = document.querySelector("#post")
const postContainer = document.querySelector("#single-post")
const commentsContainer = document.querySelector("#comments-container")


// Get ID from URL

const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get('id');

// Get all posts

async function getAllPosts() {

    const response = await fetch(url)
    console.log(response)

    const data = await response.json()
    console.log(data)

    loadingElement.classList.add("hide")

    data.map((post) => {

        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

        title.innerText = post.title
        body.innerText = post.body
        link.innerText = "Ler"
        link.setAttribute("href", `./post.html?id=${post.id}`)

        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)

        title.classList.add("blog-title")
        body.classList.add("blog-content")
        div.classList.add("blog-post")

        postsContainer.appendChild(div)

    })
}

// Get individual Posts

async function getPost(id) {

    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])

    const dataPost = await responsePost.json()
    const dataComments = await responseComments.json()

    loadingElement.classList.add("hide")
    postPage.classList.remove("hide")

    const title = document.createElement("h1")
    const body = document.createElement("p")

    title.innerText = dataPost.title
    body.innerText = dataPost.body

    postContainer.appendChild(title)
    postContainer.appendChild(body)

    dataComments.map((comment) => {
        
    })

}

if(!postId) {
    getAllPosts()
} else if (postId) {
    console.log(postId)
    getPost(postId)
}