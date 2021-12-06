 const weatherEndpoint = 'https://api.maas2.apollorion.com/';

// sol here needs to correspond to sol fetched by weather API
let sol = 3317; 
let page = 1;
 const pictureAPIKey = 'cO4ZKLydH6VHd21eDz3InRVoJISzRK6UQBTflnD9';
 const filterBySolEndpoint = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=${page}&api_key=${pictureAPIKey}`;

const todaysDate = new Date();

document.addEventListener('DOMContentLoaded', initPictures);
document.addEventListener('DOMContentLoaded', initWeather);

function initPictures () {
    const pictureData = fetch(filterBySolEndpoint)
    .then(res => res.json())
    .then(data => {
        data.photos.forEach(picture => {
            console.log(picture)
        })
    })
    return pictureData;
}

function initWeather () {
    fetch(weatherEndpoint)
    .then(res => res.json())
    .then(solObject => {
        const todaysSol = solObject.sol; 
        const weatherConditions = solObject.atmo_opacity;
        const uvIrradiance = solObject.local_uv_irradiance_index;
        const hiTemp = solObject.max_temp;
        const lowTemp = solObject.min_temp;
        const pressure = solObject.pressure;
        const season = solObject.season;
        const sunrise = solObject.sunrise;
        const sunset = solObject.sunset;
        const dateOnAEarth = solObject.terrestrial_date;
        console.log(solObject)
        // here we will need to grab html element containers
        // then create new html elements for this info and populate
        
    })
}


// define a function to return a number that is the sol to query for pictures (max number is 3000)

// define a function that returns a random number to plug into api
// to query random page number picture (max number is 50)

// define a function that converts celsius to farenheit

// define a function that toggles the farenheit/celsius when clicked

// define a function that toggles hide/view for extra information

// define a function that pops up a modal of information when clothing recommendation is clicked
// define an object with all possible weather conditions outcomes and 
// corresponding recommendations

// define a function that changes the background or color style
// based on time of day in relation to before sunrise, during the day, and after sunset

// define a function that can fetch any previous sol and then populate app with data