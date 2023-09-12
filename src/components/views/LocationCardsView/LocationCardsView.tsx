import { FC } from "react";
import "./LocationCards.css";
import LocationCard from "../../molecules/Card/LocationCard";

export type LocationCardsData = {
    locationIds: string[];
};

const LocationCardsView: FC<LocationCardsData> = (props) => {
    const { locationIds } = props;


    return (
        <div className="locationsGrid">
            {locationIds.map((location) => (
                <LocationCard location={location} key={location} />
            ))}
        </div>
    );
};

export default LocationCardsView;
