const weatherEndpoint = 'https://api.maas2.apollorion.com/';

let sol = getRandomSol();
const pictureAPIKey = 'cO4ZKLydH6VHd21eDz3InRVoJISzRK6UQBTflnD9';
const filterBySolEndpoint = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}camera=PANCAM&api_key=${pictureAPIKey}`;

// html elements to grab
const solSpan = document.getElementById('sol-number');
const seasonSpan = document.getElementById('szn-number');
const earthDateSpan = document.getElementById('earth-date');
const imageContainer = document.getElementById('image-container');
const conditionsSpan = document.getElementById('conditions');
const hiTempSpan = document.getElementById('hi-temp');
const lowTempSpan = document.getElementById('low-temp');
const sunriseSpan = document.getElementById('sunrise');
const sunsetSpan = document.getElementById('sunset');
const uvSpan = document.getElementById('uv');
const pressureSpan = document.getElementById('pressure');
const humiditySpan = document.getElementById('humidity');
const windSpan = document.getElementById('wind');
const clothingButton = document.getElementById('clothing-recs');
const viewMoreButton = document.getElementById('view-more');
const toggleButton = document.getElementById('toggle-temp');
const infoModal = document.getElementById('xt-info-modal');
const degrees = document.querySelectorAll('#c-or-f');
const recsModal = document.getElementById('recs-modal');

// event listeners
document.addEventListener('DOMContentLoaded', initPictures);
document.addEventListener('DOMContentLoaded', initWeather);
viewMoreButton.addEventListener('click', () => {
    const moreOrLess = document.getElementById('more-or-less');
    infoModal.classList.toggle('hidden');
       if (moreOrLess.innerText === 'more') {
           moreOrLess.innerText = 'less';
       } else if (moreOrLess.innerText === 'less') {
           moreOrLess.innerText = 'more';
       }
});

// add event listener for click on clothing recs
// add event listener for toggle temp

function getRandomSol() {
    const solToQuery = Math.ceil(Math.random() * 3314);
    return solToQuery;
}

function initPictures () {
    const pictureData = fetch(filterBySolEndpoint)
    .then(res => res.json())
    .then(data => {
        // console.log(data.photos)
        const howManyPhotos = data.photos.length;
        function getRandomNumberPic () {
            const num = Math.ceil(Math.random() * howManyPhotos);
            return num;
        }

        const photoToShow1 = data.photos[getRandomNumberPic()];
        const photoToShow2 = data.photos[getRandomNumberPic()];
        const photoToShow3 = data.photos[getRandomNumberPic()];
        const image1 = document.createElement('img');
        const image2 = document.createElement('img');
        const image3 = document.createElement('img');
        image1.src = photoToShow1.img_src;
        image2.src = photoToShow2.img_src;
        image3.src = photoToShow3.img_src;
        imageContainer.append(image1, image2, image3);
    })
    return pictureData;
}


function initWeather () {
    fetch(weatherEndpoint)
    .then(res => res.json())
    .then(solObject => {
        // here we will populate weather info
        const terrestrial = solObject.terrestrial_date;
        const earthDate = new Date(terrestrial);

        solSpan.innerText = solObject.sol;
        seasonSpan.innerText = solObject.season;
        earthDateSpan.innerText = earthDate.toDateString();
        conditionsSpan.innerText = solObject.atmo_opacity;
        hiTempSpan.innerText = solObject.max_temp;
        lowTempSpan.innerText = solObject.min_temp;
        sunriseSpan.innerText = solObject.sunrise;
        sunsetSpan.innerText = solObject.sunset;
        uvSpan.innerText = solObject.local_uv_irradiance_index;
        pressureSpan.innerText = solObject.pressure_string + ' ' + solObject.pressure;
        humiditySpan.innerText = solObject.abs_humidity || 'not currently available';
        windSpan.innerText = solObject.wind_speed || 'not currently available';
        

        function clothingRecs() {
            if (solObject.atmo_opacity === 'Sunny' || 'sunny') {
                const recs = weatherObj.sunny.recommendations;
                console.log(recs);

            }
       }
       clothingRecs();
    })

   
}

// need to format display time for sunrise and sunset

// replace colors with proper backgrounds
// possibly do it as add classlist and make css classes
// that match each time of day

function timeOfDay () {
    const now = new Date ();
    const currentHour = now.getHours();
    const body = document.getElementById('body');
    if (currentHour < 6 || currentHour > 19) {
        body.style.backgroundColor = '#191970';
    } else if (currentHour > 6 && currentHour < 8) {
        body.style.backgroundColor = '#FFA07A';
    } else if (currentHour > 8 && currentHour < 17) {
        body.style.backgroundColor = '#FAFAD2';
    } else if (currentHour > 17 && currentHour < 19) {
        body.style.backgroundColor = '#87CEFA';
    }
}
timeOfDay();

const weatherObj = {
        sunny: {
            recommendations: {
                1: `Don't forget your sunscreen!`,
                2: `Wear a hat for protection!`,
                3: `Drink lots of water today!`
            }
        },
        cloudy: {
            recommendations: {
                1: `Bring an umbrella in case it rains!`,
                2: `Dont forget you can still get a sunburn through the clouds!`
            }
        },
        rainy: {
            recommendations: {
                1: `Bring an umbrella!`,
                2: `Wear your rainboots!`
            }
        }
}



// define a function that converts celsius to farenheit

function convertCToF (degreesInC) {
   

}

// define a function that pops up a modal of information when clothing recommendation is clicked
// define an object with all possible weather conditions outcomes and 
// corresponding recommendations

// define a function that can fetch any previous sol and then populate app with data