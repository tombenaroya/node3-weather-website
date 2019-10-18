const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidG9tMzY5MzY5IiwiYSI6ImNrMHh3aTFzbjAweG0zbXA2Y2N5OTI1a3gifQ.STAs1JTHfZ313zbUD-nKOA&limit=1`;
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to locations service!');
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;