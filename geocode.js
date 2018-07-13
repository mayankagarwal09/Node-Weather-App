const request = require('request');


var geocodeAddress = (address, callback) => { 
var encodedAddress = encodeURIComponent(address);

    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json:true
    }, (error,response,body) => {
        if(error){
            callback('cannot connect to google servers');
        } else if(body.status === 'ZERO_RESULTS'){
            callback('Not a valid Address');
            
        }else if(body.status === "OVER_QUERY_LIMIT"){
            callback('Query limit over');
        } 
        else if(body.status === "OK"){
            callback(undefined,{
                address:body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })

            }
        
    
    });
}

var test = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('inside timeout promise');
        }, 0);
        resolve('promise');
    })
}

module.exports.geocodeAddress = geocodeAddress;
module.exports.test = test;