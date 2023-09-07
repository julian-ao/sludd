export function parseWeatherDescription(symbol_code: string) {
    // description can be prefixed by heavy, light, partly or none of these
    // description can include cloudy, fair, rain, snow, sleet, fog, clearsky ++

    let weatherDescription = symbol_code.replace(/_/g, " ");

    weatherDescription = weatherDescription.replace(
        /(heavy|light|partly)/g,
        "",
    );

    weatherDescription = weatherDescription.replace(
        /(cloudy|fair|rain|snow|sleet|fog|clearsky)/g,
        (match) => {
            switch (match) {
                case "cloudy":
                    return "cloudy";
                case "fair":
                    return "fair";
                case "rain":
                    return "rain";
                case "snow":
                    return "snow";
                case "sleet":
                    return "sleet";
                case "fog":
                    return "fog";
                case "clearsky":
                    return "clear sky";
                default:
                    return match;
            }
        },
    );

    weatherDescription =
        weatherDescription.charAt(0).toUpperCase() +
        weatherDescription.slice(1);

    return weatherDescription;
}

const weatherColors = {
    clearsky: ["#E7D097", "#E8B597", "#C8E798"],
    fair: ["#8FA1EF", "#90E0EF", "#8FEFBE"],
    cloudy: ["#9DCCF5", "#1C88E7", "#9DDBF5"],
    rain: ["#812FBC", "#2F3BBB", "#2F98BC"],
    snow: ["#41A1FA", "#5E42FA", "#42FAD8"],
    sleet: ["#36213E", "#3F3721", "#213F37"],
    fog: ["#5E568F", "#577590", "#568F84"],
};

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
