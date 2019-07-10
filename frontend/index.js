const citiesURL = "http://localhost:3000/cities"
const commentsURL = "http://localhost:3000/comments"
const landmarksURL = "http://localhost:3000/landmarks"
const cityBar = document.querySelector("#list-group")
const landmarkCard = document.querySelector("#location-detail")
const landmarkDetails = document.querySelector("#inner-details")
const getMap = document.querySelector("#map")

fetch (citiesURL)
    .then(response => response.json())
    .then(data => {
        data.forEach(city => {
            showCitySideBar(city)
    })
})

function showCitySideBar(city) {
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
    landmarkCard.innerHTML = " "
    let landmark =' '
    Object.entries(city.landmarks).forEach(([key, value]) => {
        landmark = value
        const landmarkName = document.createElement("li")
        landmarkName.innerText = landmark.name
        landmarkName.dataset.lat = landmark.latitude
        landmarkName.dataset.lng = landmark.longitude
        landmarkName.dataset.id = landmark.id
        landmarkCard.append(landmarkName)
        landmarkName.addEventListener('click', changeContent)
    })
}

function changeContent(event) {

    const landmarkLatitudeValue = event.target.dataset.lat
    const landmarkLongitudeValue = event.target.dataset.lng

    initMap(landmarkLatitudeValue, landmarkLongitudeValue)

    fetchComments(event)
}

function initMap(landmarkLatitudeValue, landmarkLongitudeValue) {

    let latNum = parseFloat(landmarkLatitudeValue);
    let lngNum = parseFloat(landmarkLongitudeValue);
    console.log(latNum, lngNum)

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
    }).then(quote => quote.json()).then(console.log)
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
;}