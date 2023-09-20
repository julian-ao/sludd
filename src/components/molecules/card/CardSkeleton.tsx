import WeatherIcon from '../../atoms/icons/WeatherIcon';
import './Card.css';
import AnimatedWave from './Wave';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTemperatureThreeQuarters,
    faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

type CardProps = {
    weatherColor?: string;
    temperature?: number;
    locationName?: string;
    symbol_code?: string;
    navneobjekttype?: string;
    locationId?: number;
    municipality?: string;
};

const CardSkeleton = (props: CardProps) => {
    const {
        weatherColor,
        temperature,
        locationName,
        symbol_code,
        navneobjekttype,
        locationId,
        municipality,
    } = props;
    const temperatureClass =
        temperature && temperature < 0
            ? 'negative-temperature'
            : 'positive-temperature';

    // Get the history object from React Router
    const navigate = useNavigate();

    // Handle click on card and navigate to location page
    const handleClick = () => {
        if (locationName) {
            navigate(`/location/${locationName}/${locationId!}`);
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
                <div className="header-section">
                    <p className="location-text">
                        {locationName || 'Laster...'}
                    </p>
                    <p className="type-text">
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            style={{ marginRight: '5px' }}
                        />
                        {navneobjekttype || ''}, {municipality || ''}
                    </p>
                </div>
                <div
                    className="wave-section"
                    style={{ backgroundColor: weatherColor || 'white' }}
                >
                    <AnimatedWave
                        color={'white'}
                        animationDuration={`${
                            Math.floor(Math.random() * (30 - 15 + 1)) + 15
                        }s`}
                        animationDirection={
                            Math.random() < 0.5 ? 'reverse' : 'normal'
                        }
                        opacity={'1'}
                    />
                    <div className={`description-section ${temperatureClass}`}>
                        {symbol_code ? (
                            <WeatherIcon symbol_code={symbol_code} size={60} />
                        ) : (
                            <div className="loading"></div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FontAwesomeIcon
                                icon={faTemperatureThreeQuarters}
                                style={{ marginRight: '5px' }}
                            />
                            {temperature ? (
                                <p>{temperature}°C</p>
                            ) : (
                                <p style={{ color: '#888' }}>Laster...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
