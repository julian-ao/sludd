import { FC } from "react";
import WeatherIcon from "../atoms/icons/WeatherIcon";
import './Card.css';
import AnimatedWave from "../views/LocationCardsView/Wave";

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
        <div className="card" style={{
            backgroundColor: weatherColor || 'black',
        }}>
            <div className="card-content">
                <div className="text-section">
                    <h3>
                        {temperature || 0}°C
                    </h3>
                    <p>
                        {locationName || "Loading..."}
                    </p>
                </div>
                <div className="wave-section" style={{ backgroundColor: weatherColor || 'black' }}>
                    <AnimatedWave
                        color={"white"}
                        //random number between 30 and 60
                        animationDuration={`${Math.floor(Math.random() * (60 - 30 + 1)) + 30}s`}
                        opacity={"1"}
                    />
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