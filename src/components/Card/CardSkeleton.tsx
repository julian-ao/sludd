import { FC } from "react";
import WeatherIcon from "../atoms/icons/WeatherIcon";
import './Card.css';

type CardProps = {
    weatherColor?: string;
    temperature?: number;
    locationName?: string;
    symbol_code?: string;
    weatherDescription?: string;
};

const CardSkeleton: FC<CardProps> = (props) => {
    const { weatherColor, temperature, locationName, symbol_code, weatherDescription } = props;

    return (
        <div className="card" style={{ backgroundColor: weatherColor || 'black' }}>
            <div className="card-content">
                <div className="text-section">
                    <h3>
                        {temperature || 0}°C
                    </h3>
                    <p>
                        {locationName || "Loading..."}
                    </p>
                </div>
                <div className="wave-section">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300" fill="none">
                        <path d="M1440 169.816L1132.8 127.862C748.8 95.8964 748.8 159.827 384 191.793C57.6 223.758 88.5 169.816 0 159.827V0.000106812L1440 0.000106812V169.816Z" fill={weatherColor || 'black'}></path>
                    </svg>
                    <div className="description-section">
                        {symbol_code ? <WeatherIcon symbol_code={symbol_code} /> :
                            //spinning loading icon
                            <div className="loading"></div>
                        }
                        <p>{weatherDescription || 'Loading...'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardSkeleton;