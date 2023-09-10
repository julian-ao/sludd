import { useParams, useSearchParams } from 'react-router-dom';
import LocationComponent from '../components/Location-page/LocationComponent';
import { useEffect } from 'react';

const LocationPage = () => {

    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const locationType = searchParams.get('locationType') || '';

    useEffect(() => {
        // Set the document title to the slug when the component mounts
        document.title = 'Sludd - ' + slug || 'Sludd';

        return () => {
            document.title = 'Sludd'; // Reset the title when the component unmounts
        };
    }, [slug]);

    return (
        <LocationComponent locationName={slug || ''} locationType={locationType || ''}  />
    );
};

export default LocationPage;
