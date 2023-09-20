import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LocationComponent from './LocationPage';

const LocationPage = () => {
    const { locationName, slug } = useParams();

    // Set the document title when 'locationName' changes and reset it when the component unmounts.
    useEffect(() => {
        document.title = 'Sludd - ' + locationName || 'Sludd';
        return () => {
            document.title = 'Sludd';
        };
    }, [locationName]);

    return (
        <LocationComponent
            locationName={locationName || ''}
            locationId={slug ? slug : undefined}
        />
    );
};

export default LocationPage;
