import './locationCards.css';
import LocationCard from '../../molecules/card/LocationCard';
import { LocationData } from '../../../lib/types';

export type LocationCardsData = {
    locationData: LocationData[];
};

const LocationCardsView = (props: LocationCardsData) => {
    const { locationData } = props;

    return (
        <div className="locationsGrid">
            {locationData.map((location) => (
                <LocationCard
                    key={location.stedsnummer}
                    locationData={location}
                />
            ))}
        </div>
    );
};

export default LocationCardsView;
