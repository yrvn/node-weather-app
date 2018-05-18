const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const apikey = 'AIzaSyBCP_ZZpAxf9Nc0gN7vsPZR6ie3Hwp2Ukk';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&apikey=' + apikey;
        console.log(url);
        request({
                url,
                json: true
            },
            (error, response, body) => {
                if (error) {
                    reject('Unable to connect to Google servers.');
                } else if (body.status === 'ZERO_RESULTS') {
                    reject('Unable to find that address.');
                } else if (body.status === 'OK') {
                    resolve({
                        address: body.results[0].formatted_address,
                        latitude: body.results[0].geometry.location.lat,
                        longitude: body.results[0].geometry.location.lng
                    });
                }
            }
        );
    });
};

geocodeAddress('Pablo de Maria 1220').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
})