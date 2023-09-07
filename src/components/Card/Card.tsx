import './Card.css';
import { useLocationWeatherQuery } from '../../lib/useLocationWeatherQuery';
import WeatherIcon from '../atoms/icons/WeatherIcon';
import { getColorFromWeatherDescription, parseWeatherDescription } from '../../lib/cardHelpers';

const LocationCard = ({ location }: { location: string }) => {
    const { locationData, weatherQuery } = useLocationWeatherQuery(location);

    if (weatherQuery.isLoading || !locationData) {
        return <div>Loading...</div>;
    }

    if (weatherQuery.isError) {
        return <div>Error loading data</div>;
    }

    const data = weatherQuery.data.properties.timeseries[0].data;
    const symbol_code = data.next_1_hours.summary.symbol_code;
    const temperature = data.instant.details.air_temperature;

    const weatherDescription = parseWeatherDescription(symbol_code);
    const weatherColor = getColorFromWeatherDescription(symbol_code);

    return (
        <div className="card" style={{ backgroundColor: weatherColor }}>
            <div className="card-content">
                <div className="text-section">
                    <h3>
                        {temperature}°C
                    </h3>
                    <p>
                        {locationData?.navn[0].stedsnavn[0].skrivemåte}
                    </p>
                </div>
                <div className="wave-section">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300" fill="none">
                        <path d="M1440 169.816L1132.8 127.862C748.8 95.8964 748.8 159.827 384 191.793C57.6 223.758 88.5 169.816 0 159.827V0.000106812L1440 0.000106812V169.816Z" fill={weatherColor}></path>
                    </svg>
                    <div className="description-section">
                        <WeatherIcon symbol_code={symbol_code} />
                        <p>{weatherDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationCard;
