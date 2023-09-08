// BlogPost.js
import { useParams } from 'react-router-dom';
import LocationComponent from '../components/Location-page/LocationComponent';

const LocationPage = () => {
    const { slug } = useParams();

    return (
        <LocationComponent locationName={slug || ''}  />
    );
};

export default LocationPage;
