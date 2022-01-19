import L from "leaflet";
export function addTileLayer(map) {
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.Coded by <a target="_blank" href="https://hashnode.com/@Ibrakhimzhanov">Ibrakhimzhanov</a>.',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoibWVjaDE5OTIyIiwiYSI6ImNreWxpMXpzMTM2ZHQycHBieG4xYXN1NDUifQ.xLfmHze1pbIHQNowqyV2jQ",
    }
  ).addTo(map);
}
