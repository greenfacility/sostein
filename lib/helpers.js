const weatherIcons = {
  '01d': '/static/weather/day.svg',
  '02d': '/static/weather/cloudy-day-1.svg',
  '03d': '/static/weather/cloudy-day-2.svg',
  '04d': '/static/weather/cloudy-day-3.svg',
  '09d': '/static/weather/rainy-4.svg',
  '10d': '/static/weather/rainy-1.svg',
  '11d': '/static/weather/thunder.svg',
  '13d': '/static/weather/snowy-3.svg',
  '50d': '/static/weather/cloudy-day-3.svg',
  '01n': '/static/weather/night.svg',
  '02n': '/static/weather/cloudy-night-1.svg',
  '03n': '/static/weather/cloudy-night-2.svg',
  '04n': '/static/weather/cloudy-night-3.svg',
  '09n': '/static/weather/rainy-4.svg',
  '10n': '/static/weather/rainy-5.svg',
  '11n': '/static/weather/thunder.svg',
  '13n': '/static/weather/snowy-5.svg',
  '50n': '/static/weather/cloudy-day-3.svg'
};

// Capitalize
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowercase(string) {
  return string.toLowerCase();
}

// Format price
export function formatPrice(number) {
  const fnumber = parseFloat(number);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(fnumber);
}

// Get wind direction
export function windDirection(degree) {
  const sectors = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

  degree += 22.5;

  if (degree < 0) {
    degree = 360 - (Math.abs(degree) % 360);
  } else {
    degree = degree % 360;
  }

  const which = parseInt(degree / 45, 10);
  return sectors[which];
}

// Get weather icon class
export function getWeatherIcon(code, size) {
  const icon = weatherIcons[code];
  return (
    <span
      css={`
        background: none, url(${icon}) no-repeat;
        background-size: contain;
        width: ${size}px;
        height: ${size}px;
        display: inline-block;
      `}
    />
  );
}

// Get weather data
export async function getWeather(city, country, days) {
  let forecast = undefined;
  try {
    const forecast_call = await fetch(
      `//api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${
        process.env.weatherApi
      }&cnt=${days}&units=metric`
    )
      .then(res => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })
      .catch(console.error);

    if (forecast_call !== undefined) {
      forecast = await forecast_call.json();
    }

    return forecast;
  } catch (e) {
    return '';
  }
}

function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, function($1) {
      return $1.toUpperCase();
    })
    .replace(/ /g, '');
}

export function objectToCamelCase(origObj) {
  return Object.keys(origObj).reduce(function(newObj, key) {
    let val = origObj[key];
    let newVal = typeof val === 'object' ? objectToCamelCase(val) : val;
    newObj[toCamelCase(key)] = newVal;
    return newObj;
  }, {});
}
