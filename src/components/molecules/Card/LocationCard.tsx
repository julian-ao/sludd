import './Card.css';
import { useLocationWeatherQuery } from '../../../lib/useLocationWeatherQuery';
import { getColorFromWeatherDescription } from '../../../lib/cardHelpers';
import CardSkeleton from './CardSkeleton';


const LocationCard = ({ location }: { location: string }) => {
    const { locationData, weatherQuery } = useLocationWeatherQuery({ locationId: location });

    if (weatherQuery.isLoading || !locationData) {
        return <CardSkeleton />;
    }

    if (weatherQuery.isError) {
        return <CardSkeleton locationName='Not found' />;
    }

    const data = weatherQuery.data.properties.timeseries[0].data;
    const symbol_code = data.next_1_hours.summary.symbol_code;
    const temperature = data.instant.details.air_temperature;

    const weatherColor = getColorFromWeatherDescription(symbol_code);

    return (
        <CardSkeleton
            weatherColor={weatherColor}
            temperature={temperature}
            locationName={locationData?.navn[0].stedsnavn[0].skrivemåte}
            locationId={locationData?.navn[0].stedsnummer}
            symbol_code={symbol_code}
            navneobjekttype={locationData?.navn[0].navneobjekttype}
        />
    );
};

export default LocationCard;
