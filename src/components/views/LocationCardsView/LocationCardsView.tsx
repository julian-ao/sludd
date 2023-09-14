import { FC } from "react";
import "./LocationCards.css";
import LocationCard from "../../molecules/Card/LocationCard";
import { LocationData } from "../../../lib/types";

export type LocationCardsData = {
    locationData: LocationData[];
};

const LocationCardsView: FC<LocationCardsData> = (props) => {
    const { locationData } = props;

    return (
        <div className="locationsGrid">
            {locationData.map((location) => (
                <LocationCard key={location.stedsnummer} locationData={location} />
            ))}
        </div>
    );
};

export default LocationCardsView;
