import { FC } from "react";
import LocationCard from "../../Card/Card";
import styles from "./LocationCards.module.css";

export type LocationCardsData = {
    locations: string[];
};

const LocationCardsView: FC<LocationCardsData> = (props) => {
    const { locations } = props;


    return (
        <div className={styles.locationsGrid}>
            {locations.map((location) => (
                <LocationCard location={location} key={location} />
            ))}
        </div>
    );
};

export default LocationCardsView;
