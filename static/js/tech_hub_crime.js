function crime_map(coordinates) {
  var map = L.map("map", {
    center: coordinates,
    zoom: 4.5

  });
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(map);
  return map
};

coordinates = {
  "nyc": [40.730610, -73.935242],
  "atlanta": [33.7490, -84.3880],
  "austin": [30.2672, -97.7431],
  "san francisco": [37.7749, -122.4194],
  "chicago": [41.8781, -87.6298]
}

url = {
  "nyc": ["https://data.cityofnewyork.us/resource/qgea-i56i.json"],
  "atlanta": [],
  "austin": ["https://data.austintexas.gov/resource/fdj4-gpfu.json"],
  "san francisco": ["https://data.sfgov.org/resource/cuks-n6tp.json?"],
  "chicago": ["https://data.cityofchicago.org/resource/dfnk-7re6.json"]
}

// Data from each city's opendata portal (atlanta's page is under construction. use csv)


// nyc crime function 
function nyc_markers(url, map) {
  d3.json(url, function (response) {
    for (var i = 0; i < response.length; i++) {
      var location = response[i];
      if (location.lat_lon) {
        L.marker([location.latitude, location.longitude]).addTo(map);
      }
    }
  })
}


// // chicago crime function 

function chi_markers(url, map) {
  d3.json(url, function (response) {
    for (var i = 0; i < response.length; i++) {
      var location = response[i];
      if (location.location) {
        L.marker([location.latitude, location.longitude]).addTo(map);
      }
    }
  })
}

// san fran crime function 

function sanfran_markers(url, map) {
  d3.json(url, function (response) {
    for (var i = 0; i < response.length; i++) {
      var location = response[i].location;
      if (location) {
        L.marker([location.coordinates[1], location.coordinates[0]]).addTo(map);
      }
    }
  })
}

//  austin crime function 

function austin_markers(url, map) {
  d3.json(url, function (response) {
    for (var i = 0; i < response.length; i++) {
      var location = response[i].location;
      if (location) {
        L.marker([location.latitude, location.longitude]).addTo(map);
      }
    }
  })
}

// atlanta crime function

var csv_atl = ("../Resources/Atlanta_Crime.csv")
function atlanta_markers(csv_atl, map) {
  d3.csv(csv_atl, function (response) {
    for (var i = 0; i < response.length; i++) {
      var location = response[i].location;
      if (location) {
        L.marker([location.latitude, location.longitude]).addTo(map);
      }
    }
  })
}

//function map calls

var map = crime_map(coordinates["chicago"])
chi_markers(url["chicago"], map)
// nyc_markers(url["nyc"], map)
// sanfran_markers(url["san francisco"], map)
// austin_markers(url["austin"], map)