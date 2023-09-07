import './Card.css';
import { useLocationWeatherQuery } from '../../lib/useLocationWeatherQuery';
import { getColorFromWeatherDescription, parseWeatherDescription } from '../../lib/cardHelpers';
import CardSkeleton from './CardSkeleton';


const LocationCard = ({ location }: { location: string }) => {
    const { locationData, weatherQuery } = useLocationWeatherQuery(location);

    if (weatherQuery.isLoading || !locationData) {
        return <CardSkeleton />;
    }

    if (weatherQuery.isError) {
        return <CardSkeleton weatherDescription="Error" locationName='Not found' />;
    }

    const data = weatherQuery.data.properties.timeseries[0].data;
    const symbol_code = data.next_1_hours.summary.symbol_code;
    const temperature = data.instant.details.air_temperature;

    const weatherDescription = parseWeatherDescription(symbol_code);
    const weatherColor = getColorFromWeatherDescription(symbol_code);

    return (
        <CardSkeleton
            weatherColor={weatherColor}
            temperature={temperature}
            locationName={locationData?.navn[0].stedsnavn[0].skrivemåte}
            symbol_code={symbol_code}
            weatherDescription={weatherDescription}
        />
    );
};

export default LocationCard;
