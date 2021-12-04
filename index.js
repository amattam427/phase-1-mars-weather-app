 const weatherEndpoint = 'https://api.maas2.apollorion.com/';
 let sol = 1000;
 const pictureAPIKey = 'cO4ZKLydH6VHd21eDz3InRVoJISzRK6UQBTflnD9';
 const filterBySolEndpoint = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${pictureAPIKey}`;



document.addEventListener('DOMContentLoaded', init);

function init () {
    fetch(filterBySolEndpoint)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });

    fetch(weatherEndpoint)
    .then(res => res.json())
    .then(data => {
        // this is way to much data to fetch, needs to be more specific
        console.log(data);
    })
}