const citiesURL = "http://localhost:3000/cities"
// const cityBar = document.querySelector("#list-group")
const cityBar = document.querySelector("#city-list")

// const landmarkCard = document.querySelector("#location-detail")
const landmarkCard = document.querySelector("#landmark-name")

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
    const landmarkAddress = event.target.dataset.address
    const landmarkRatingValue = event.target.dataset.rating

    const landmarkFormattedAddress = document.createElement("p")
    landmarkFormattedAddress.innerText = `Address: ${landmarkAddress}`

    const landmarkRating = document.createElement("p")
    landmarkRating.innerText = `Rating: ${landmarkRatingValue}`

    const landmarkDescription = document.createElement("textarea")
    
    landmarkDetails.append(landmarkFormattedAddress, landmarkDescription, landmarkRating)

    initMap(landmarkLatitudeValue, landmarkLongitudeValue)
}

function initMap(landmarkLatitudeValue, landmarkLongitudeValue) {

    let latNum = parseFloat(landmarkLatitudeValue);
    let lngNum = parseFloat(landmarkLongitudeValue);

    let currentLandmark = {lat: latNum, lng: lngNum};

    let map = new google.maps.Map(
        document.getElementById('map'), {zoom: 13, center: currentLandmark}
    )

    let marker = new google.maps.Marker({position: currentLandmark, map: map});
}
