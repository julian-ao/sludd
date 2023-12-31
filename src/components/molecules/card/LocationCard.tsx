import './Card.css';
import { getColorFromWeatherDescription } from '../../../lib/cardHelpers';
import CardSkeleton from './CardSkeleton';
import { LocationData, WeatherQueryData } from '../../../lib/types';
import { useQuery } from '@tanstack/react-query';

interface LocationCardProps {
    locationData: LocationData;
}

const LocationCard = ({ locationData }: LocationCardProps) => {
    const coordinates = locationData.representasjonspunkt;
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coordinates.nord}&lon=${coordinates.øst}`;
    const {
        data: weatherData,
        isLoading: weatherIsLoading,
        isError: weatherIsError,
    } = useQuery<WeatherQueryData>(
        ['weather', coordinates.nord, coordinates.øst],
        async () => {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        },
        {
            enabled: !!coordinates,
        },
    );

    // Return skeleton if weather is loading or location data is undefined
    if (weatherIsLoading || !locationData) {
        return <CardSkeleton />;
    }

    // Return skeleton not found if weather is error
    if (weatherIsError) {
        return <CardSkeleton locationName="Not found" />;
    }

    const weatherProperties = weatherData.properties.timeseries[2].data;
    const lastHourWeatherProperties = weatherData.properties.timeseries[1].data;
    const symbol_code =
        lastHourWeatherProperties.next_1_hours.summary.symbol_code;
    const temperature = weatherProperties.instant.details.air_temperature;
    const weatherColor = getColorFromWeatherDescription(symbol_code);

    return (
        <CardSkeleton
            weatherColor={weatherColor}
            temperature={temperature}
            locationName={locationData?.stedsnavn[0].skrivemåte}
            locationId={parseInt(locationData?.stedsnummer)}
            symbol_code={symbol_code}
            navneobjekttype={locationData?.navneobjekttype}
            municipality={locationData?.kommuner?.[0].kommunenavn}
        />
    );
};

export default LocationCard;
