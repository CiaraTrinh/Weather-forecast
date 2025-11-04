const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

document.querySelector('.search-box input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        search.click();
    }
});

search.addEventListener('click', () => {

    const APIKey = '9864c5b5c894079f2a976983270c493c';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        
        if(json.cod === 404){
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main) {
            case 'Clear':
                image.src = './image/clear.jpg';
                break;

            case 'Clouds':
                image.src = './image/cloudy.jpg';
                break;

            case 'Rain':
                image.src = './image/rainy.jpg';
                break;

            case 'Thunderstorm':
                image.src = './image/storm.jpg';
                break;
            
            case 'Snow':
                image.src = './image/snow.jpg';
                break;
            
            case 'Wind':
                image.src = './image/windy.jpg';
                break;

            default:
                image.src = './image/sunny.jpg';
                break;       
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

    })

    .catch(error => {
            console.error('Error fetching weather:', error);
    });
});