const request = require('request');

 
var getWeather = (lat, long, callback) => {

    
request({
    url:`https://api.darksky.net/forecast/${process.env.API_KEY}/${lat},${long}`,
    json:true
}, (error,response,body) => {
    if(error){
        callback('cannot connect to weather servers');
    } else if(response.statusCode === 400){
        callback('Unable to fetch weather');
    } else if(response.statusCode === 200){
        var temp=body.currently.temperature;
        temp = (temp-32)*(5/9);
        callback({
            temp:temp,
            summary:body.daily.summary
        })
    
    }
});

}

module.exports.getWeather = getWeather;