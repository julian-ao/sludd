import { FC } from "react";
import WeatherIcon from "../../atoms/icons/WeatherIcon";
import './Card.css';
import AnimatedWave from "./Wave";
import { useNavigate  } from "react-router-dom";

type CardProps = {
    weatherColor?: string;
    temperature?: number;
    locationName?: string;
    symbol_code?: string;
    weatherDescription?: string;
    navneobjekttype?: string;
};

const CardSkeleton: FC<CardProps> = (props) => {
    const { weatherColor, temperature, locationName, symbol_code, weatherDescription, navneobjekttype } = props;

    // Get the history object from React Router
    const navigate  = useNavigate();

    const handleClick = () => {
        if (locationName) {
            navigate(`/${locationName}`);
        }
    };

    return (
        <div
            className="card"
            style={{
                backgroundColor: weatherColor || 'white',
            }}
            onClick={handleClick}
        >
            <div className="card-content">
                <div className="text-section">
                    <h3>{navneobjekttype || ""}</h3>
                    <h2>
                        {temperature || 0}°C
                    </h2>
                    <p>
                        {locationName || "Loading..."}
                    </p>
                </div>
                <div className="wave-section" style={{ backgroundColor: weatherColor || 'white' }}>
                    <AnimatedWave
                        color={"white"}
                        animationDuration={`${Math.floor(Math.random() * (30 - 15 + 1)) + 15}s`}
                        animationDirection={Math.random() < 0.5 ? "reverse" : "normal"}
                        opacity={"1"}
                    />
                    <div className="description-section">
                        {symbol_code ? <WeatherIcon symbol_code={symbol_code} /> :
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