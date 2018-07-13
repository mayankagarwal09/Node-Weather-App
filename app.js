const yargs = require('yargs');

require('dotenv').config();

const geocode = require('./geocode');
const weather = require('./weather');
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

    geocode.geocodeAddress(argv.a, (errorMessage, result) => {
        if(errorMessage){
            console.log(errorMessage);
        }else{
            console.log(result.address);
            
            weather.getWeather(result.latitude,result.longitude, (errorMessage, weatherResult) => {
                if(errorMessage){
                    console.log(errorMessage);
                }else{
                    console.log(weatherResult.temp);
                    console.log(weatherResult.summary);
                }
            });
            
        
        }
    });


       
 

