import './location_page.css';
import { useLocationWeatherQuery } from '../../lib/useLocationWeatherQuery';
import { convertDateToReadable } from '../../lib/utils';
import HeartButton from '../HeartButton/HeartButton';

type LocationComponentProps = {
    locationName: string;
};

const LocationComponent = (props: LocationComponentProps) => {
    const { locationName } = props;

    const { locationData, weatherQuery } = useLocationWeatherQuery(locationName);

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
                Last updated {convertDateToReadable(weatherQuery.data.properties.meta.updated_at)}<br/><br/>
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
                        <h1>{weatherQuery.data.properties.timeseries[1].data.next_1_hours.summary.symbol_code}</h1>
                    </div>
                </div>
                <div className='location_body'>
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Weather</th>
                                <th>Temp.</th>
                                <th>Rainfall</th>
                                <th className='hidden_column'>Wind</th>
                                <th className='hidden_column'>Air humidity</th>
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
                                        <td>{adjustedWeather.data.next_1_hours?.summary.symbol_code || 'N/A'}</td>
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
                                            <svg
                                                className='wind_icon'
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 384 512"
                                                style={{ transform: `rotate(${adjustedWeather.data.instant.details.wind_from_direction}deg)` }}
                                            >
                                                <path fill='#6D6D6D' d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/>
                                            </svg>
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