//Code to find the coordinates of user inputted address
import axios from 'axios';

const form = document.querySelector('form')!
const address = document.getElementById('address')! as HTMLInputElement;
const API_KEY = 'AIzaSyA9KpOuhD51UuwUsIyI4Qj_kcSUyqwOOL4';


type GoogleResponse = {
    results: {geometry: {location: {lat: number, lng: number}}, formatted_address: string}[];
    status: 'OK' | 'ZERO_RESULTS';
};

function addressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = address.value;

    axios
    .get<GoogleResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=${encodeURI(enteredAddress)}&key=${API_KEY}`)
    .then(response => {
        if (response.data.status != 'OK'){
            throw new Error("Could not fetch location...")
        };
        console.log(response);
        const coordinates = response.data.results[0].geometry.location;
        const fullAdd = response.data.results[0].formatted_address;
        document.querySelector('h3')!.textContent = fullAdd!.toString();
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: coordinates,
        zoom: 15
        });

        new google.maps.Marker({position: coordinates, map: map})
    })
    .catch(error => {
        alert(error);
        console.log(error);
    });
};

form.addEventListener('submit', addressHandler);