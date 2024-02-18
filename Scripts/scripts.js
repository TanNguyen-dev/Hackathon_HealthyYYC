let map;

function initMap(lat = -25.344, lng = 131.031) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat, lng },
    zoom: 4,
  });
}

document.getElementById("getLocation").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (map) {
          map.setCenter(pos);
        } else {
          initMap(pos.lat, pos.lng);
        }

        const marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: "Your Location",
        });
      },
      () => {
        handleLocationError(true, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, map.getCenter());
  }
});

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


