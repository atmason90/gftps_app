const dataSfApiKey = "7SFurrNyXW9LfiWUuTww8sRek";
const rootUrl = "https://data.sfgov.org/resource/rqzj-sfat.json";
let foodTrucks = [];

function initMap() {
  $.ajax({
    url: rootUrl,
    type: "GET",
    data: {
      $limit: 5000,
      status: 'APPROVED',
      $$app_token: dataSfApiKey,
    },
  }).done(function (data) {
    data.map((truck) => foodTrucks.push(truck));
      // ------------------------------  RADAR MAPS API  -------------------------------
  var map = new maplibregl.Map({
    container: "map",
    style:
      "https://api.radar.io/maps/styles/radar-default-v1?publishableKey=" +
      "prj_live_pk_65685c32866f997ce2becae9c604d024bae999a9",
    center: [-122.431297, 37.773972], // SF
    zoom: 11,
  });

  map.addControl(new maplibregl.NavigationControl());

  for(let i = 0; i < foodTrucks.length; i++){
    let lon = foodTrucks[i].longitude
    let lat = foodTrucks[i].latitude

    // Trying to get schedules, but can't find dayshours field in any responses
    // $.ajax({
    //     url: rootUrl,
    //     type: "GET",
    //     data: {
    //         objectid: foodTrucks[i].objectid,
    //         schedule: foodTrucks[i].schedule,
    //         // dayshours: "IS NOT NULL",
    //         $$app_token: dataSfApiKey
    //     }
    // }).done(function (data) {
    //     console.log(data)
    // })

    let marker = new maplibregl.Marker({ color: "#007aff" })
    .setLngLat([lon, lat])
    .addTo(map); // Radar HQ

    let popupText = "<strong>" + foodTrucks[i].applicant + "</strong><p>" + foodTrucks[i].address + "<p><h6>Food Items</h6><p>" + foodTrucks[i].fooditems.replaceAll("Cold Truck:", "").replaceAll("Cold truck:", "").replaceAll(':', ",") + "<p>";

    let popup = new maplibregl.Popup({
        closeButton: true,
        closeOnClick: true
    }).setHTML(popupText)

    marker.setPopup(popup)
  }


  });
  console.log(foodTrucks);


}

initMap();
