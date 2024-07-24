const searchButton = document.getElementById("submit-data")
const yearSelector = document.getElementById("year")
const dataTypeSelector = document.getElementById("data-type")

initDocument()

function initDocument() {
    //Create all year options
    i = 2011
    while (true) {
        let option = document.createElement("option")
        option.value = i
        option.innerText = i
        yearSelector.appendChild(option)
        i++
        if (i >= 2024) {
            break
        }
    }

    searchButton.addEventListener("click", () => search())

    //setup map with default data
    search()


}

function search() {
    const year = yearSelector.value
    const dataType = dataTypeSelector.value
    console.log(year)
    console.log(dataType)
    getMapData(year, dataType)
}

async function getMapData(year, dataType) {
    const url1 = " https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
    const dataPromise1 = await fetch(url1)
    const geoJSON = await dataPromise1.json()

    initMap(geoJSON)
}

function initMap(geoJSON) {

    
    let map = L.map("map" ,{
        minZoom: -3,
        
    })

    console.log(geoJSON);

    let geojason = L.geoJSON(geoJSON, {
        weight: 2,
        onEachFeature: setTooltips
    }).addTo(map)
    
    map.fitBounds(geojason.getBounds())

    let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
    }).addTo(map);

}

function setTooltips(feature, layer) {
    layer.bindTooltip(feature.properties.nimi)
    layer.bindPopup(
        `<ul>
            <li>${feature.properties.nimi}</li>
        </ul>`

    )
}