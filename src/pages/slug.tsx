import { useParams } from 'react-router-dom';
import LocationComponent from '../components/Location-page/LocationComponent';
import { useEffect } from 'react';

const LocationPage = () => {
    const { slug } = useParams();

    useEffect(() => {
        // Set the document title to the slug when the component mounts
        document.title = 'Sludd - ' + slug || 'Sludd';

        // Optionally, you can return a cleanup function if needed
        return () => {
            document.title = 'Sludd'; // Reset the title when the component unmounts
        };
    }, [slug]);

    return (
        <LocationComponent locationName={slug || ''}  />
    );
};

export default LocationPage;
