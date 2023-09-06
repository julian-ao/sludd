
import { FC } from 'react';
import './location_page.css';
import { useLocationWeatherQuery } from '../../lib/useLocationWeatherQuery';

type LocationComponentProps = {
    locationName: string;
};

const LocationComponent: FC<LocationComponentProps> = (props) => {
    const { locationName } = props;

    const { locationData, weatherQuery } = useLocationWeatherQuery(locationName);

    if (weatherQuery.isLoading || !locationData) {
        return <div>Loading...</div>;
    }

    if (weatherQuery.isError) {
        return <div>Error loading data</div>;
    }

    // Retrieve current date and time
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Filter out the weather data for the current day
    const todaysWeather = weatherQuery.data.properties.timeseries.filter((timeSeriesItem) => {
        const date = new Date(timeSeriesItem.time);
        return date.getHours() >= currentHour+1 && 
               date.getDate() === currentDay && 
               date.getMonth() === currentMonth && 
               date.getFullYear() === currentYear;
    });


    return (
        <div className="location_main">
            <div className="location_header">
                <div className='location_header_name'>
                    <img src="../src/assets/heart.svg" alt='Hjerte'/>
                    <h1>{locationData.navn[0].stedsnavn[0].skrivemåte}</h1>
                </div>
                <div className='location_header_info'>
                    <h1>{weatherQuery.data.properties.timeseries[2].data.instant.details.air_temperature}°C</h1>
                    <h1>{weatherQuery.data.properties.timeseries[1].data.next_1_hours.summary.symbol_code}</h1>
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
                            <th>Vind(kast) m/s</th>
                            <th>Luftfuktighet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todaysWeather.map((weather, index) => (
                            <tr key={index}>
                                <td>{new Date(weather.time).getHours()}:00</td>
                                <td>{weather.data.next_1_hours?.summary.symbol_code || 'N/A'}</td>
                                <td>{weather.data.instant.details.air_temperature || 'N/A'}°C</td>
                                <td>{weather.data.next_1_hours?.details.precipitation_amount } mm</td>
                                <td>{weather.data.instant.details.wind_speed || 'N/A'} m/s</td>
                                <td>{weather.data.instant.details.relative_humidity || 'N/A'}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LocationComponent;