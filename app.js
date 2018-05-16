const request = require('request');

const apikey = 'AIzaSyBCP_ZZpAxf9Nc0gN7vsPZR6ie3Hwp2Ukk';
var url =
    'http://maps.googleapis.com/maps/api/geocode/json?address=Calle%202%20y%20Felipe%20cardoso&apikey=' +
    apikey;

request({
        url,
        json: true
    },
    (error, response, body) => {
        //console.log(JSON.stringify(error, undefined, 2));
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
);