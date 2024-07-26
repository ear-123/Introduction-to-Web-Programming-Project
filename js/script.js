const searchButton = document.getElementById("submit-data")
const yearSelector = document.getElementById("year")
const dataTypeSelector = document.getElementById("data-type")

let geoJSON = null
let map = null
let dataOnMap = null

initDocument()

function initDocument() {
    //Create all year options
    i = 1990
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

    searchButton.addEventListener("click", () => updateMap())

    //setup map
    initMap()

}

async function updateMap() {
    if (map != null) map.remove()
    
    map = L.map("map" ,{
        minZoom: -3,        
    })

    let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
    }).addTo(map)

    const year = yearSelector.value
    const dataType = dataTypeSelector.value
    //console.log(year)
    //console.log(dataType)

    const url = "https://statfin.stat.fi:443/PxWeb/api/v1/fi/StatFin/synt/statfin_synt_pxt_12dy.px"
    const response = await fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(querryJSON)
    })
    dataOnMap = await response.json()
    
    console.log(dataOnMap)

    let geojason = L.geoJSON(geoJSON, {
        weight: 2,
        onEachFeature: setTooltips
    }).addTo(map)
    map.fitBounds(geojason.getBounds())
    //console.log(map);
}

async function initMap() {
    const url1 = " https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
    const dataPromise1 = await fetch(url1)
    geoJSON = await dataPromise1.json()

    console.log(geoJSON);

    updateMap()
}

function setTooltips(feature, layer) {
    console.log(feature.properties.kunta)
    layer.bindTooltip(feature.properties.nimi)
    layer.bindPopup(
        `<ul>
            <li>${feature.properties.nimi}</li>
        </ul>`

    )
}


let querryJSON = {
    "query": [
      {
        "code": "Vuosi",
        "selection": {
          "filter": "item",
          "values": [
            "2023"
          ]
        }
      },
      {
        "code": "Alue",
        "selection": {
          "filter": "agg:_Kunnat tunnusjärjestyksessä tunnuksineen 2024.agg",
          "values": [
            "SSS",
            "KU005",
            "KU009",
            "KU010",
            "KU016",
            "KU018",
            "KU019",
            "KU020",
            "KU035",
            "KU043",
            "KU046",
            "KU047",
            "KU049",
            "KU050",
            "KU051",
            "KU052",
            "KU060",
            "KU061",
            "KU062",
            "KU065",
            "KU069",
            "KU071",
            "KU072",
            "KU074",
            "KU075",
            "KU076",
            "KU077",
            "KU078",
            "KU079",
            "KU081",
            "KU082",
            "KU086",
            "KU090",
            "KU091",
            "KU092",
            "KU097",
            "KU098",
            "KU102",
            "KU103",
            "KU105",
            "KU106",
            "KU108",
            "KU109",
            "KU111",
            "KU139",
            "KU140",
            "KU142",
            "KU143",
            "KU145",
            "KU146",
            "KU148",
            "KU149",
            "KU151",
            "KU152",
            "KU153",
            "KU165",
            "KU167",
            "KU169",
            "KU170",
            "KU171",
            "KU172",
            "KU176",
            "KU177",
            "KU178",
            "KU179",
            "KU181",
            "KU182",
            "KU186",
            "KU202",
            "KU204",
            "KU205",
            "KU208",
            "KU211",
            "KU213",
            "KU214",
            "KU216",
            "KU217",
            "KU218",
            "KU224",
            "KU226",
            "KU230",
            "KU231",
            "KU232",
            "KU233",
            "KU235",
            "KU236",
            "KU239",
            "KU240",
            "KU241",
            "KU244",
            "KU245",
            "KU249",
            "KU250",
            "KU256",
            "KU257",
            "KU260",
            "KU261",
            "KU263",
            "KU265",
            "KU271",
            "KU272",
            "KU273",
            "KU275",
            "KU276",
            "KU280",
            "KU284",
            "KU285",
            "KU286",
            "KU287",
            "KU288",
            "KU290",
            "KU291",
            "KU295",
            "KU297",
            "KU300",
            "KU301",
            "KU304",
            "KU305",
            "KU309",
            "KU312",
            "KU316",
            "KU317",
            "KU318",
            "KU320",
            "KU322",
            "KU398",
            "KU399",
            "KU400",
            "KU402",
            "KU403",
            "KU405",
            "KU407",
            "KU408",
            "KU410",
            "KU416",
            "KU417",
            "KU418",
            "KU420",
            "KU421",
            "KU422",
            "KU423",
            "KU425",
            "KU426",
            "KU430",
            "KU433",
            "KU434",
            "KU435",
            "KU436",
            "KU438",
            "KU440",
            "KU441",
            "KU444",
            "KU445",
            "KU475",
            "KU478",
            "KU480",
            "KU481",
            "KU483",
            "KU484",
            "KU489",
            "KU491",
            "KU494",
            "KU495",
            "KU498",
            "KU499",
            "KU500",
            "KU503",
            "KU504",
            "KU505",
            "KU507",
            "KU508",
            "KU529",
            "KU531",
            "KU535",
            "KU536",
            "KU538",
            "KU541",
            "KU543",
            "KU545",
            "KU560",
            "KU561",
            "KU562",
            "KU563",
            "KU564",
            "KU576",
            "KU577",
            "KU578",
            "KU580",
            "KU581",
            "KU583",
            "KU584",
            "KU588",
            "KU592",
            "KU593",
            "KU595",
            "KU598",
            "KU599",
            "KU601",
            "KU604",
            "KU607",
            "KU608",
            "KU609",
            "KU611",
            "KU614",
            "KU615",
            "KU616",
            "KU619",
            "KU620",
            "KU623",
            "KU624",
            "KU625",
            "KU626",
            "KU630",
            "KU631",
            "KU635",
            "KU636",
            "KU638",
            "KU678",
            "KU680",
            "KU681",
            "KU683",
            "KU684",
            "KU686",
            "KU687",
            "KU689",
            "KU691",
            "KU694",
            "KU697",
            "KU698",
            "KU700",
            "KU702",
            "KU704",
            "KU707",
            "KU710",
            "KU729",
            "KU732",
            "KU734",
            "KU736",
            "KU738",
            "KU739",
            "KU740",
            "KU742",
            "KU743",
            "KU746",
            "KU747",
            "KU748",
            "KU749",
            "KU751",
            "KU753",
            "KU755",
            "KU758",
            "KU759",
            "KU761",
            "KU762",
            "KU765",
            "KU766",
            "KU768",
            "KU771",
            "KU777",
            "KU778",
            "KU781",
            "KU783",
            "KU785",
            "KU790",
            "KU791",
            "KU831",
            "KU832",
            "KU833",
            "KU834",
            "KU837",
            "KU844",
            "KU845",
            "KU846",
            "KU848",
            "KU849",
            "KU850",
            "KU851",
            "KU853",
            "KU854",
            "KU857",
            "KU858",
            "KU859",
            "KU886",
            "KU887",
            "KU889",
            "KU890",
            "KU892",
            "KU893",
            "KU895",
            "KU905",
            "KU908",
            "KU915",
            "KU918",
            "KU921",
            "KU922",
            "KU924",
            "KU925",
            "KU927",
            "KU931",
            "KU934",
            "KU935",
            "KU936",
            "KU941",
            "KU946",
            "KU976",
            "KU977",
            "KU980",
            "KU981",
            "KU989",
            "KU992"
          ]
        }
      },
      {
        "code": "Tiedot",
        "selection": {
          "filter": "item",
          "values": [
            "vaesto"
          ]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
  }