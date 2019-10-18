const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = `https://api.darksky.net/forecast/b048fc671c4236765a36d16b7104a0b0/${encodeURIComponent(latitude)},${encodeURIComponent(longtitude)}?units=si`;     

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.error) {
            callback('Unable to find location!');
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} chance of rain.`);
        }
    });
}

module.exports = forecast;