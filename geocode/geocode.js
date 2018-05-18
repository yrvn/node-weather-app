const request = require('request');

var geocodeAddress = (address, callback) => {
    const apikey = 'AIzaSyBCP_ZZpAxf9Nc0gN7vsPZR6ie3Hwp2Ukk';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&apikey=' + apikey;
    console.log(url);
    request({
            url,
            json: true
        },
        (error, response, body) => {

            if (error) {
                callback('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                callback('Unable to find that address.');
            } else if (body.status === 'OK') {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        }
    );
}

module.exports.geocodeAddress = geocodeAddress;