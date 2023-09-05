// BlogPost.js
import { useParams } from 'react-router-dom';

const LocationPage = () => {
  const { slug } = useParams();

  return (
    <div>
      <h2>Location</h2>
      <p>Slug: {slug}</p>
      {/* Your blog content goes here */}
    </div>
  );
};

export default LocationPage;
