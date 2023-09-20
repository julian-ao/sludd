// Dictionary of weather descriptions for the different weather types
const weatherDescription: { [key: string]: string } = {
    clearsky: "Clear sky",
    fair: "Fair",
    partlycloudy: "Partly cloudy",
    cloudy: "Cloudy",
    lightrainshowers: "Light rain showers",
    rainshowers: "Rain showers",
    heavyrainshowers: "Heavy rain showers",
    lightrainshowersandthunder: "Light rain showers and thunder",
    rainshowersandthunder: "Rain showers and thunder",
    heavyrainshowersandthunder: "Heavy rain showers and thunder",
    lightsleetshowers: "Light sleet showers",
    sleetshowers: "Sleet showers",
    heavysleetshowers: "Heavy sleet showers",
    lightssleetshowersandthunder: "Light sleet showers and thunder",
    sleetshowersandthunder: "Sleet showers and thunder",
    heavysleetshowersandthunder: "Heavy sleet showers and thunder",
    lightsnowshowers: "Light snow showers",
    snowshowers: "Snow showers",
    heavysnowshowers: "Heavy snow showers",
    lightssnowshowersandthunder: "Light snow showers and thunder",
    snowshowersandthunder: "Snow showers and thunder",
    heavysnowshowersandthunder: "Heavy snow showers and thunder",
    lightrain: "Light rain",
    rain: "Rain",
    heavyrain: "Heavy rain",
    lightrainandthunder: "Light rain and thunder",
    rainandthunder: "Rain and thunder",
    heavyrainandthunder: "Heavy rain and thunder",
    lightsleet: "Light sleet",
    sleet: "Sleet",
    heavysleet: "Heavy sleet",
    lightsleetandthunder: "Light sleet and thunder",
    sleetandthunder: "Sleet and thunder",
    heavysleetandthunder: "Heavy sleet and thunder",
    lightsnow: "Light snow",
    snow: "Snow",
    heavysnow: "Heavy snow",
    lightsnowandthunder: "Light snow and thunder",
    snowandthunder: "Snow and thunder",
    heavysnowandthunder: "Heavy snow and thunder",
    fog: "Fog",
};

// Takes a symbol_code and returns the corresponding weather description
export function parseWeatherDescription(symbol_code: string) {
    const splitSymbolCode = symbol_code.split("_");
    const description = weatherDescription[splitSymbolCode[0]];

    return description;
}
// Dictionary of colors for the different weather types
const weatherColors = {
    clearsky: ["#ded364", "#ede26f", "#d9cf64"],
    fair: ["#8FEFBE", "#90F0AE", "#90F0CF"],
    cloudy: ["#8C9C9A", "#8D9C8E", "#9C998C"],
    rain: ["#8AD2EA", "#A4DCEE", "#93d1e6"],
    snow: ["#6E8FF5", "#6EA7F5", "#6EBEF5"],
    sleet: ["#9FA1ED", "#AB9FEC", "#B89FED"],
    fog: ["#5E6385", "#605E84", "#675E85"],
};

// Takes a symbol_code and returns the corresponding color
export function getColorFromWeatherDescription(symbol_code: string) {
    //use weatherColors to get color from symbol_code
    for (const [key, value] of Object.entries(weatherColors)) {
        if (symbol_code.includes(key)) {
            if (Array.isArray(value)) {
                return value[Math.floor(Math.random() * value.length)];
            }
            return value;
        }
    }
    return "#000000";
}
