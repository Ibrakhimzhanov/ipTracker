import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { validateIp } from "./helpers";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timeZoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
});

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.Coded by <a target="_blank" href="https://hashnode.com/@Ibrakhimzhanov">Ibrakihmzhanov</a>.',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibWVjaDE5OTIyIiwiYSI6ImNreWxpMXpzMTM2ZHQycHBieG4xYXN1NDUifQ.xLfmHze1pbIHQNowqyV2jQ",
  }
).addTo(map);

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
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText =
    mapData.location.country + " " + mapData.location.region;
  timeZoneInfo.innerText = mapData.location.timezone;
  ispInfo.innerText = mapData.isp;
}
