import './location_page.css';
import { useLocationWeatherQuery } from '../../lib/useLocationWeatherQuery';
import { convertDateToReadable } from '../../lib/utils';
import HeartButton from '../HeartButton/HeartButton';
import WeatherIcon from '../atoms/icons/WeatherIcon';
import BackButton from '../atoms/BackButton';

type LocationComponentProps = {
    locationName: string;
    locationType: string;
};

const LocationComponent = ({ locationName, locationType }: LocationComponentProps) => {
    
    const { locationData, weatherQuery } = useLocationWeatherQuery(locationName, locationType);

    if (weatherQuery.isLoading || !locationData) {
        return <div className='location_main'>Loading...</div>;
    }

    if (weatherQuery.isError) {
        return <div className='location_main'>Error loading data</div>;
    }

    // Retrieve current date and time
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentDay = currentDate.getDate();

    // Filter out the weather data for the current day
    const todaysWeather = weatherQuery.data.properties.timeseries.filter((timeSeriesItem) => {
        const date = new Date(timeSeriesItem.time);
        return date.getHours() >= currentHour &&
               date.getDate() === currentDay;
    });

    return (
        <div className='location_main'>
            <div className='location_content'>
                <div className='location_header_top'>
                    <BackButton />
                    <div className='last_updated'>
                        Sist oppdatert {convertDateToReadable(weatherQuery.data.properties.meta.updated_at)}
                    </div>
                </div>
                <div className='location_header'>
                    <div className='location_header_name'>
                        <HeartButton location={locationData.navn[0].stedsnavn[0].skrivemåte} />
                        <h1>{locationData.navn[0].stedsnavn[0].skrivemåte}</h1>
                    </div>
                    <div className='location_header_info'>
                        <h1 className={
                            weatherQuery.data.properties.timeseries[2].data.instant.details.air_temperature > 0
                                ? 'positive-temperature'
                                : 'negative-temperature'
                        }>
                            {weatherQuery.data.properties.timeseries[2].data.instant.details.air_temperature}°C
                        </h1>
                        {
                            weatherQuery.data.properties.timeseries[1].data.next_1_hours.summary.symbol_code
                                && <WeatherIcon
                                    symbol_code={weatherQuery.data.properties.timeseries[1].data.next_1_hours.summary.symbol_code}
                                    size={60}
                                    />
                        }
                    </div>
                </div>
                <div className='location_body'>
                    <table>
                        <thead>
                            <tr>
                                <th>Tid</th>
                                <th>Vær</th>
                                <th>Temp.</th>
                                <th>Nedbør</th>
                                <th className='hidden_column'>Vind</th>
                                <th className='hidden_column'>Luftfuktighet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todaysWeather.map((weather, index) => {
                                // Adjust the index with 2 to retrieve the correct data
                                const adjustedWeather = weatherQuery.data.properties.timeseries[index + 2];
                                return (
                                    <tr key={index}>
                                        <td>
                                            {new Date(weather.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td>{
                                            weather.data.next_1_hours.summary.symbol_code
                                                ? <WeatherIcon symbol_code={weather.data.next_1_hours.summary.symbol_code} />
                                                : <div className="loading"></div>}
                                            </td>
                                        <td className={
                                            adjustedWeather.data.instant.details.air_temperature > 0
                                                ? 'positive-temperature'
                                                : 'negative-temperature'
                                        }>
                                            {adjustedWeather.data.instant.details.air_temperature || 'N/A'}°C
                                        </td>
                                        <td className='negative-temperature'>{adjustedWeather.data.next_1_hours?.details.precipitation_amount } mm</td>
                                        <td className='hidden_column'>
                                            {adjustedWeather.data.instant.details.wind_speed || 'N/A'} m/s
                                            <img
                                                src="/src/assets/arrow.svg"
                                                alt=""
                                                className='wind_icon'
                                                style={{ transform: `rotate(${adjustedWeather.data.instant.details.wind_from_direction}deg)` }}
                                            />
                                        </td>
                                        <td className='hidden_column'>{adjustedWeather.data.instant.details.relative_humidity || 'N/A'}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default LocationComponent;