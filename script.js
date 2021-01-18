var map, infoWindow;

// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://api.kroger.com/v1/products?filter.brand={{BRAND}}&filter.term={{TERM}}&filter.locationId={{LOCATION_ID}}",
//   "method": "GET",
//   "headers": {
//     "Accept": "application/json",
//     "Authorization": "Bearer {{TOKEN}}"
//   }
// }

var map = [];
var markers = [];
var coords = [];

const data = data.json

var results = []
var epi
var envHealth =
var "epiRanking": 2,
"envPerfIndex": "83.9500",
"envHealth": "95.7100",
"ecosystemVitality":

for (var i=0 ; i < data.list.length ; i++)
{
    if (data.list[i][== searchBox) {
        results.push(data.list[i]);
    }
}

function initMap() {

}

// Adds a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });

    //push to array
    markers.push(marker);
    coords.push(location);
}

// "data": {
// "productId": "0001111041700",
// "aisleLocations": [],
// "brand": "Kroger",
// "categories": [],
// "countryOrigin": "United States",
// "description": "Kroger 2% Reduced Fat Milk",
// "items": [],
// "itemInformation": {},
// "temperature": {},
// "images": [],
// "upc": "0001111041700"
// },
// "meta": {
// "pagination": {},
// "warnings": []
//
// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

function createMap() {
  var options = {
    center: {
      lat: 43.654,
      lng: -79.383
    },
    zoom: 10,
    styles: [{
        elementType: 'geometry',
        stylers: [{
          color: '#242f3e'
        }]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#242f3e'
        }]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#746855'
        }]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{
          color: '#263c3f'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#6b9a76'
        }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          color: '#38414e'
        }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#212a37'
        }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#9ca5b3'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
          color: '#746855'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#1f2835'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#f3d19c'
        }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#2f3948'
        }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#17263c'
        }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#515c6d'
        }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#17263c'
        }]
      }
    ]
  }

  map = new google.maps.Map(document.getElementById('map'), options);

  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(p) {
      var position = {
        lat: p.coords.latitude,
        lng: p.coords.longitude
      };

      const image ="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
      const locationMarker = new google.maps.Marker({
      position: position,
      map,
      icon: image,
    });
      //
      // infoWindow.setPosition(position);
      // infoWindow.setContent('Your location!');
      // infoWindow.open(map);
      // map.setCenter(position);

    }, function() {
      handleLocationError('Geolocation service failed', map.getCenter());
    });
  } else {
    handleLocationError('No geolocation available.', map.getCenter());
  }

  function handleLocationError(content, position) {
    infoWindow.setPosition(position);
    infoWindow.setContent(content);
    infoWindow.open(map);
  }

  var input = document.getElementById('search');
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0)
      return;

    markers.forEach(function(m) {
      m.setMap(null);
    });
    markers = [];

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(p) {
      if (!p.geometry)
        return;

      markers.push(new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometry.location
      }));

      if (p.geometry.viewport)
        bounds.union(p.geometry.viewport);
      else
        bounds.extend(p.geometry.location);
    });

    map.fitBounds(bounds);
  });
}
