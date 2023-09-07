import { FC } from "react";
import "./LocationCards.css";
import LocationCard from "../../Card/LocationCard";

export type LocationCardsData = {
    locations: string[];
};

const LocationCardsView: FC<LocationCardsData> = (props) => {
    const { locations } = props;


    return (
        <div className="locationsGrid">
            {locations.map((location) => (
                <LocationCard location={location} key={location} />
            ))}
        </div>
    );
};

export default LocationCardsView;
