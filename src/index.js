import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { addTileLayer, validateIp } from "./helpers";
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timeZoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

//! map
const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});
const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
});
addTileLayer(map);
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

//! getIp
function getData() {
  if (validateIp(ipInput.value)) {
    fetch(`
    https://geo.ipify.org/api/v2/country,city?apiKey=at_wLYiIYXjUBCb5Gqb0IfuZhhj9LM3e&=${ipInput.value}`)
      .then((response) => response.json())
      .then((data) => setInfo(data));
  }
}

function handleKey(event) {
  if (event.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  const { lat, lng, country, region, timezone } = mapData.location;
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + " " + region;
  timeZoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);
}
