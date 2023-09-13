import { FC } from "react";
import "./LocationCards.css";
import LocationCard from "../../molecules/Card/LocationCard";
import { LocationQueryData } from "../../../lib/types";

export type LocationCardsData = {
    locationData: LocationQueryData;
};

const LocationCardsView: FC<LocationCardsData> = (props) => {
    const { locationData } = props;

    return (
        <div className="locationsGrid">
            {locationData?.navn?.map((location) => (
                <LocationCard key={location.stedsnummer} locationData={location} />
            ))}
        </div>
    );
};

export default LocationCardsView;
