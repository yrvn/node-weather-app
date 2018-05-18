const request = require('request');

var getWeather = (lat, lng, callback) => {
    const apikey = 'e8398a059e89a9e6ad27f4132169f714';
    var url = `https://api.darksky.net/forecast/${apikey}/${lat},${lng}`;

    request({
            url,
            json: true
        },
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                callback(undefined, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            } else {
                callback('Unable to fetch Weather.');
            }
        }
    );
};

module.exports.getWeather = getWeather;