import { useParams } from 'react-router-dom';
import LocationComponent from '../components/Location-page/LocationComponent';
import { useEffect } from 'react';

const LocationPage = () => {


    const { locationName, slug } = useParams();

    useEffect(() => {
        document.title = 'Sludd - ' + locationName || 'Sludd';
        return () => {
            document.title = 'Sludd';
        };
    }, [locationName]);

    return (
        <LocationComponent locationName={locationName || ''} locationId={slug ? slug : undefined} />
    );
};

export default LocationPage;
