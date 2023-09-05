// BlogPost.js
import { useParams } from 'react-router-dom';
import LocationComponent from '../components/Location-page/LocationComponent';

const LocationPage = () => {
  const { slug } = useParams();

  return (
    <div>
      <h2>Location</h2>
      <p>Slug: {slug}</p>
      {/* Your blog content goes here */}
      <LocationComponent children={'Hei'} />
    </div>
  );
};

export default LocationPage;
