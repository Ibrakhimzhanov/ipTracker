import "babel-polyfill";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { addOffset, addTileLayer, getAdress, validateIp } from "./helpers";
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timeZoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

//! Create Map
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

//! get Ip address
function getData() {
  if (validateIp(ipInput.value)) {
    getAdress(ipInput.value).then(setInfo);
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
  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getAdress("102.22.22.1").then(setInfo);
});
