const yargs = require('yargs');

require('dotenv').config();
const axios = require('axios');

const argv = yargs
    .options({
        a:{
            demand:true,
            describe:'Address to search lat long for',
            alias:'address',
            string:true
        }
    })
    .argv;

    var encodedAddress = encodeURIComponent(argv.address);
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`) 
    .then((result) => {
        if(result.data.status === 'ZERO_RESULTS')
         throw new Error('Not a valid Address');
        else if(result.data.status === 'OVER_QUERY_LIMIT')
         throw new Error('Query limit over');
        console.log(result.data.results[0].formatted_address);
        var lat = result.data.results[0].geometry.location.lat;
        var lng = result.data.results[0].geometry.location.lng;
        var weatherURl = `https://api.darksky.net/forecast/${process.env.API_KEY}/${lat},${lng}`;
        return axios.get(weatherURl);
        
    }).then((res) => {
        var temp = res.data.currently.temperature;
        var apparentTemp = res.data.currently.apparentTemperature;
        temp = (temp -32)*(5/9);
        apparentTemp = (apparentTemp -32)*(5/9);
        console.log(`It is ${temp} C currently but it feels like ${apparentTemp} C`);
        console.log(res.data.daily.summary);
    })    
    .catch((e) => {
        if(e.code === 'ENOTFOUND'){
            console.log('cannot connect to Google Maps');
        }else{
        console.log(e.message);
        }
    }) 
 

