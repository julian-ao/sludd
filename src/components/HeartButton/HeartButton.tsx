import { useState } from 'react';
import './heartbutton.css';
import Popup from '../atoms/popup/Popup';
import solidHeart from '../../assets/heart-solid.svg';
import borderHeart from '../../assets/heart-border.svg';
import { LocationData } from '../../lib/types';

export type HeartButtonProps = {
    location: LocationData
};

const HeartButton = (props: HeartButtonProps) => {
    const [favorited, setFavorited] = useState<boolean>(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        return favorites.map((f: LocationData) => f.stedsnummer).includes(props.location.stedsnummer);
    });

    const [isPopupShown, setIsPopupShown] = useState(false);

    const [popupText, setPopupText] = useState<string>();

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (favorited) {
            const updatedFavorites = favorites.filter((f: LocationData) => f.stedsnummer !== props.location.stedsnummer);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setPopupText("💔 " + props.location.stedsnavn[0].skrivemåte + " fjernet fra favoritter");
        } else {
            favorites.push(props.location);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setPopupText("💖 " + props.location.stedsnavn[0].skrivemåte + " lagt til i favoritter");
        }

        setFavorited(!favorited);
        showPopup();
    };

    const showPopup = () => {
        setIsPopupShown(true);

        setTimeout(() => {
            setIsPopupShown(false);
        }, 1500);
    };

    return (
        <div>
            <div className='heart_div' onClick={toggleFavorite}>
                <img
                    className='solid'
                    style={favorited ? { opacity: 1 } : {}}
                    src={solidHeart}
                    alt='Hjerte'
                />
                <img src={borderHeart} alt='Hjerte' />
            </div>
            <Popup text={popupText || ''} show={isPopupShown} />
        </div>
    );
};

export default HeartButton;
