const citiesURL = "http://localhost:3000/cities"
const commentsURL = "http://localhost:3000/comments"
const landmarksURL = "http://localhost:3000/landmarks"
const usersURL = "http://localhost:3000/users"

const cityBar = document.querySelector("#city-list")
const landmarkCard = document.querySelector("#landmark-name")

// const landmarkDetails = document.querySelector("#inner-details")
const landmarkDetails = document.querySelector("#landmark-info")

// const getMap = document.querySelector("#map2")
const getMap = document.querySelector("#map")


const checkbox = document.querySelector("#checkbox")


document.addEventListener("DOMContentLoaded", function () {
    User()
});

function User() {
    const userplace = document.querySelector('.user')
    const div = document.createElement("div")
    div.className = "new-user-div"

    const input = document.createElement("input")
    input.placeholder = "Enter your user name here"
    input.className = "new-user"
    input.autofocus = true

    const buttonCreate = document.createElement("button")
    buttonCreate.className = "btn btn-success"
    buttonCreate.innerText = "Create user"
    buttonCreate.addEventListener("click", event => createUser(event))

    const buttonLogIn = document.createElement("button")
    buttonLogIn.className = "btn btn-success"
    buttonLogIn.innerText = "LogIn user"
    buttonLogIn.addEventListener("click", event => logInUser(event))

    div.append(input, buttonCreate, buttonLogIn)
    userplace.appendChild(div)

    return userplace
};

function logInUser(event) {
    const user = document.querySelector('.new-user')

    const userName = user.value;

    fetch(usersURL)
        .then(response => response.json())
        .then(users => checkUser(users, userName))
};

function checkUser(users, userName) {
    const userFound = users.find(user => user.username === userName);

    if (userFound) {
        fetchCities(userFound, citiesURL)
    } else {
        const div = document.querySelector('body')

        const noUser = document.createElement('h1')
        noUser.innerText = "Please enter valid credentials"

        div.appendChild(noUser)
        return div
    }
};

function createUser(event) {
  
    const newUser = document.querySelector('.new-user')

    const newUserName = {
        "username": newUser.value,
    };

    fetch(usersURL, {
        method: "POST",
        body: JSON.stringify(newUserName),
        headers: {
          "Content-Type": "application/json"
        }
    }).then(resp => resp.json()
    .then(data => fetchCities(data, citiesURL)))

};

function fetchCities(userFound, citiesURL) {

    fetch(citiesURL)
        .then(citiesData => citiesData.json())
        .then(citiesDataResp => {
            citiesDataResp.forEach(city => {
                showCitySideBar(userFound, city)
        })
});

function showCitySideBar(data, city) {
    const cityName = document.createElement("li")
    cityName.innerText = city.name
    cityName.dataset.id = city.id
    cityName.classList.add('list-group-item')

    cityName.addEventListener('click', onCityClick)

    cityBar.append(cityName)
}

function onCityClick(event) {
    getSingleCity(event.target.dataset.id)
        .then(showLandmarkCard)
}

function getSingleCity(id) {
    return fetch(citiesURL + `/${id}`)
        .then(response => response.json())
}

function showLandmarkCard(city) {
    checkbox.checked = false
    console.log(checkbox.checked)
    landmarkCard.innerHTML = " "
    landmarkDetails.innerHTML = " "
    getMap.innerHTML = " "
    let landmark =' '
    
    Object.entries(city.landmarks).forEach(([key, value]) => {
        landmark = value
        const landmarkName = document.createElement("li")
        landmarkName.dataset.id = landmark.id
        landmarkName.innerText = landmark.name
        landmarkName.dataset.lat = landmark.latitude
        landmarkName.dataset.lng = landmark.longitude
        landmarkName.dataset.id = landmark.id
        landmarkName.dataset.address = landmark.formatted_address
        landmarkName.dataset.rating = landmark.rating
        landmarkCard.append(landmarkName)
        landmarkName.addEventListener('click', changeContent)
    })
}

function changeContent(event) {

    landmarkDetails.innerHTML = " "

    const landmarkLatitudeValue = event.target.dataset.lat
    const landmarkLongitudeValue = event.target.dataset.lng
    const landmarkData = event.target.dataset.id
    const landmarkAddress = event.target.dataset.address
    const landmarkRatingValue = event.target.dataset.rating

    const landmarkFormattedAddress = document.createElement("p")
    landmarkFormattedAddress.innerText = `Address: ${landmarkAddress}`

    const spaceing = document.createElement("br")
    const spaceing2 = document.createElement("br")

    const landmarkRating = document.createElement("p")
    landmarkRating.innerText = `Rating: ${landmarkRatingValue} / 5`
    
    landmarkDetails.append(landmarkFormattedAddress, spaceing, landmarkRating, spaceing2)

    initMap(landmarkLatitudeValue, landmarkLongitudeValue)

    createNewCommentForm(event, landmarkData)
    fetchComments(event)

};

function createNewCommentForm(landmarkData) {
    const div = document.createElement("div")
    div.className = "new-comment-div"

    const textarea = document.createElement("textarea")
    textarea.placeholder = "Enter your comment here"
    textarea.className = "new-comment"
    textarea.autofocus = true

    const buttonCreate = document.createElement("button")
    buttonCreate.className = "btn btn-success"
    buttonCreate.innerText = "Create Comment"
    buttonCreate.addEventListener("click", event => createComment(event, landmarkData))

    landmarkDetails.append(textarea, buttonCreate)

    return landmarkDetails
};

function createComment(event, landmarkData) {
    const newComment = document.querySelector('.new-comment')

    const newContent = {
        "description": newComment.value,
        // "user_id": ,
        "landmark_id": landmarkData.target.dataset.id
    };

    fetch(commentsURL, {
        method: "POST",
        body: JSON.stringify(newContent),
        headers: {
          "Content-Type": "application/json"
        }
    }).then(resp => resp.json()).then(newCommentData => addComment(newCommentData))

};

function initMap(landmarkLatitudeValue, landmarkLongitudeValue) {

    let latNum = parseFloat(landmarkLatitudeValue);
    let lngNum = parseFloat(landmarkLongitudeValue);

    let currentLandmark = {lat: latNum, lng: lngNum};

    let map = new google.maps.Map(
        document.getElementById('map'), {zoom: 13, center: currentLandmark}
    )


    let marker = new google.maps.Marker({position: currentLandmark, map: map});


}

function fetchComments(event) {
    fetch(`${landmarksURL}/${event.target.dataset.id}`)
        .then(landmarkData => landmarkData.json())
        .then(landmark => displayComments(landmark, event))
};

function displayComments(landmark, event) {
    const commentsList = document.querySelector(".comment-body")

    commentsList.innerHTML = ""
    const comments = landmark["comments"]
    comments.map(comment => {
        addComment(comment)
    })
};

function addComment(comment) {
    const commentsList = document.querySelector(".comment-body")
    const div = createCommentView(comment)
    commentsList.appendChild(div)

};

function createCommentView(comment) {

    // const user = 

    // if user 

    const div = document.createElement("div")
    div.className = "comment-div"
    div.dataset.id = comment.id

    const textarea = document.createElement("textarea")
    textarea.innerText = comment.description
    textarea.id = comment.id

    const buttonEdit = document.createElement("button")
    buttonEdit.id = comment.id
    buttonEdit.className = "btn btn-info"
    buttonEdit.innerText = "Edit Comment"
    buttonEdit.addEventListener("click", event => updateComment(event, comment))
// debugger

    const buttonDelete = document.createElement("button")
    buttonDelete.id = comment.id
    buttonDelete.className = "btn btn-danger"
    buttonDelete.innerText = "Delete Comment"
    buttonDelete.addEventListener("click", event => deleteComment(event, comment))

    div.append(textarea, buttonEdit, buttonDelete)

    return div
};

function updateComment(event, comment) {

    const domNode = document.querySelector(`div[data-id="${comment.id}"`).firstElementChild

    const editedContent = {
        "description": domNode.value,
    };

    fetch(`${commentsURL}/${comment.id}`, {
        method: "PATCH",
        body: JSON.stringify(editedContent),
        headers: {
          "Content-Type": "application/json"
        }
    }).then(quote => quote.json())
};

function deleteComment(event, comment) {
    return fetch(`${commentsURL}/${comment.id}`, {
        method: "DELETE"
      })
      .then(resp => resp.json())
      .then(comment => removeDOMContent(comment));
  }

function removeDOMContent(response) {
    const domNode = document.querySelector(`div[data-id="${response.commentId}"`)
    domNode.remove();
}};