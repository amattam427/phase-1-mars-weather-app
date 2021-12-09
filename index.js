// api information
const weatherEndpoint = 'https://api.maas2.apollorion.com/';
let sol = getRandomSol();
const pictureAPIKey = 'cO4ZKLydH6VHd21eDz3InRVoJISzRK6UQBTflnD9';
const filterBySolEndpoint = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}camera=PANCAM&api_key=${pictureAPIKey}`;

// html elements
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
const recsModal = document.getElementById('recs-modal');
const modalOuter = document.querySelector('.modal-outer');
const modalOuter2 = document.querySelector('.modal-outer-2');
const recsP = document.getElementById('recs');

const form = document.getElementById('sol-search');
const textInput = document.getElementById('user-input');


// event listeners
document.addEventListener('DOMContentLoaded', initPictures);
document.addEventListener('DOMContentLoaded', displayData(weatherEndpoint));

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = parseInt(textInput.value);
    const weatherEndpointSearched = `https://api.maas2.apollorion.com/${query}`;
    displayData(weatherEndpointSearched);
    textInput.value = '';
})

toggleButton.addEventListener('click', () => {
    console.log('in event');
    cOrF();
});

// initialize weather
let solObject = [];
let isTrueOrFalse = true;

function init(urlToFetch) {
    return fetch(urlToFetch)
    .then(res => {
        if(!res.ok) {
            throw new Error('bad response')
        } 
        return res.json();
    })
    .then(dataFromFetch => {
        return dataFromFetch;
    })
    .catch(error => {
        console.log(error);
    })
}

function displayData(url) {
    init(url)
    .then(dataFromFetch => {
        let solObject = dataFromFetch;
        console.log(solObject);
        const terrestrial = solObject.terrestrial_date;
        const earthDate = new Date(terrestrial);
        
        solSpan.innerText = solObject.sol;
        seasonSpan.innerText = solObject.season;
        earthDateSpan.innerText = earthDate.toDateString();
        conditionsSpan.innerText = solObject.atmo_opacity;
        hiTempSpan.innerText = solObject.max_temp + `\xB0` + `C`;
        lowTempSpan.innerText = solObject.min_temp + `\xB0` + `C`;
        
        sunriseSpan.innerText = solObject.sunrise;
        sunsetSpan.innerText = solObject.sunset;
        uvSpan.innerText = solObject.local_uv_irradiance_index;
        pressureSpan.innerText = solObject.pressure_string + ' ' + solObject.pressure;
        humiditySpan.innerText = solObject.abs_humidity || 'not currently available';
        windSpan.innerText = solObject.wind_speed || 'not currently available';
    })
}

function cOrF() {
    console.log(solObject)
    let isCelsius = hiTempSpan.innerText.includes(`\xB0` + `C`);
    let isFahrenheit = hiTempSpan.innerText.includes(`\xB0` + `F`);
    let lowDegreesF = Math.round(convertCToF(solObject.min_temp));
    let hiDegreesF = Math.round(convertCToF(solObject.max_temp));
    console.log(isTrueOrFalse);
    if(isTrueOrFalse) {
        console.log('hi');
        isTrueOrFalse = !isTrueOrFalse;
        hiTempSpan.innerText = hiDegreesF + `\xB0` + `F`;
        lowTempSpan.innerText =  lowDegreesF + `\xB0` + `F`;
    } else {
        console.log('hello');
        isTrueOrFalse = !isTrueOrFalse;
        hiTempSpan.innerText = Math.round(convertFToC(hiDegreesF)) + `\xB0` + `C`;
        lowTempSpan.innerText = Math.round(convertFToC(lowDegreesF)) + `\xB0` + `C`;
    }
}

// weather recs object
const weatherObj = {
    sunny: {
        recommendations: 
            [`Don't forget your sunscreen!`, `Wear a hat for protection!`, `Drink lots of water today!`]
    },
    cloudy: {
        recommendations: 
            [`Bring an umbrella in case it rains!`, `Dont forget you can still get a sunburn through the clouds!`, `Wear a light jacket in case it's chilly!`] 
    },
    rainy: {
        recommendations: 
            [`Bring an umbrella!`, `Wear your rainboots!`, `Don't forget a rain jacket.`]
    }
}

function clothingRecs() {
    const recommendations = weatherObj.sunny.recommendations;
    recommendations.forEach(rec => {
        const p = document.createElement('p');
        p.innerText = rec;
        recsP.append(p);
    })   
}
clothingRecs();


// initialize pictures
function getRandomSol() {
    const solToQuery = Math.ceil(Math.random() * 3314);
    return solToQuery;
}

function initPictures () {
    const pictureData = fetch(filterBySolEndpoint)
    .then(res => res.json())
    .then(data => {
        if (data.photos.length >= 3) {
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
        }
    })
    return pictureData;
}

// temperature conversion functions
function convertCToF (celsius) {
    const cTemp = celsius;
    const cToFahr = cTemp * 9 / 5 + 32;
    return cToFahr;
}

function convertFToC (fahrenheit) {
    const fTemp = fahrenheit;
    const fToCel = (fTemp - 32) * 5 / 9;
    return fToCel;
}

// MODAL functions and event handlers
clothingButton.addEventListener('click', () => {
    modalOuter2.classList.add('open-2');
});

modalOuter2.addEventListener('click', function(event) {
    const isOutside = !event.target.closest('.modal-inner-2');
    if (isOutside) {
      closeModal2();
    }
  });

window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal2();
    }
  });

function closeModal2() {
    modalOuter2.classList.remove('open-2');
}

viewMoreButton.addEventListener('click', () => {
    modalOuter.classList.add('open');
});

modalOuter.addEventListener('click', function(event) {
    const isOutside = !event.target.closest('.modal-inner');
    if (isOutside) {
      closeModal();
    }
});

window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
    }
});

function closeModal() {
    modalOuter.classList.remove('open');
}

// function for changing background for time of day
function timeOfDay () {
    const now = new Date ();
    const currentHour = now.getHours();
    const body = document.getElementById('body');
    if (currentHour < 6 || currentHour >= 19) {
        body.style.backgroundImage = `url('./images/night.png')`;
        body.style.color = 'white';
    } else if (currentHour >= 6 && currentHour < 9) {
        body.style.backgroundImage = `url('./images/earlymorning.png')`;
    } else if (currentHour >= 9 && currentHour < 16) {
        body.style.backgroundImage = `url('./images/daytime.png')`;
    } else if (currentHour >= 16 && currentHour < 19) {
        body.style.backgroundImage = `url('./images/afternoon.png')`;
    }
}
timeOfDay();



// TO DO:
// fix toggle temp for searched sol
// error handling for sol search that doesnt exist