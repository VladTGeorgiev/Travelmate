const citiesURL = "http://localhost:3000/cities"
const cityBar = document.querySelector("#list-group")
const landmarkCard = document.querySelector("#location-detail")

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
        landmarkCard.append(landmarkName)
    })
}
