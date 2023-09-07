import { FC } from "react";
import LocationCard from "../../Card/Card";
import "./LocationCards.css";

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
