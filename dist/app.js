"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form = document.querySelector('form');
const address = document.getElementById('address');
const API_KEY = 'AIzaSyA9KpOuhD51UuwUsIyI4Qj_kcSUyqwOOL4';
function addressHandler(event) {
    event.preventDefault();
    const enteredAddress = address.value;
    axios_1.default
        .get(`https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=${encodeURI(enteredAddress)}&key=${API_KEY}`)
        .then(response => {
        if (response.data.status != 'OK') {
            throw new Error("Could not fetch location...");
        }
        ;
        console.log(response);
        const coordinates = response.data.results[0].geometry.location;
        const fullAdd = response.data.results[0].formatted_address;
        document.querySelector('h3').textContent = fullAdd.toString();
        const map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: 15
        });
        new google.maps.Marker({ position: coordinates, map: map });
    })
        .catch(error => {
        alert(error);
        console.log(error);
    });
}
;
form.addEventListener('submit', addressHandler);
//# sourceMappingURL=app.js.map