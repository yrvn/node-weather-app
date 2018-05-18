const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const apikey = 'AIzaSyBCP_ZZpAxf9Nc0gN7vsPZR6ie3Hwp2Ukk';
var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(argv.address) + '&apikey=' + apikey;

axios.get(url).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    const apikeyWeather = 'e8398a059e89a9e6ad27f4132169f714';
    var weatherUrl = `https://api.darksky.net/forecast/${apikeyWeather}/${lat},${lng}`;
    console.log('====================================');
    console.log(response.data.results[0].formatted_address);
    console.log('====================================');
    return axios.get(weatherUrl).then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    })
}).catch((e) => {

    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API server');
    } else {
        console.log(e.message);
    }
})