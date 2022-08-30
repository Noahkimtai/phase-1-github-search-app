// Ensure that the javascript is loaded only after the document has been reloaded
// I did this by adding defer to the script element

//Accept: application/vnd.github.v3+json

let octacatRepos = 'https://api.github.com/users/octocat/repos'; // url to the list of github users
let userContainer = document.querySelector('#user-list'); // The html ul element that holds the users
// add li elements to the usersListContainer
let li = document.createElement('li');

let form = document.querySelector('#github-form')
form.addEventListener('submit',e =>fetchUser(e))

// define the fetchUser function
function fetchUser(e){
    e.preventDefault()
    let userInput = e.target.querySelector('#search').value
    // create a fecth request using the form input
    //fetch(`${octacatRepos}`).then(res =>res.json()).then(data =>console.log(data))
    fetch(`https://api.github.com/search/users?q=${userInput}`).then(res=>res.json()).then(data =>displayUserData(data))
    form.reset()
}

function displayUserData(data){
    // this function takes the data that is fetched form the API and display them inside the page
    data.items.forEach(item =>{
        let avatar = document.createElement('img')
        let p = document.createElement('p')
        let profile = document.createElement('a')
        profile.innerText='Profile'
        profile.href=item.html_url
        p.innerText = item.login
        avatar.src=item.avatar_url
        li.appendChild(avatar)
        li.appendChild(p)
        li.appendChild(profile)
        userContainer.appendChild(li)
        avatar.addEventListener('click', e=>{
            fetch(`https://api.github.com/users/${item.login}/repos`)
            .then(res =>res.json()).then(data => data.forEach(data =>{ 
                document.createElement('p')
                p.innerText = `${data.name}, ${data.full_name}, created on: ${data.created_at}`
                console.log(data)
            }))

        })
    })
    };