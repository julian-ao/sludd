import { useState } from 'react';
import './heartbutton.css';
import Popup from '../atoms/popup/Popup';

export type HeartButtonProps = {
    location: string;
};

const HeartButton = (props: HeartButtonProps) => {
    const [favorited, setFavorited] = useState(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        return favorites.includes(props.location);
    });

    const [isPopupShown, setIsPopupShown] = useState(false);

    const [popupText, setPopupText] = useState<string>();

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (favorited) {
            const updatedFavorites = favorites.filter((fav: string) => fav !== props.location);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setPopupText("💔 " + props.location + " fjernet fra favoritter");
        } else {
            favorites.push(props.location);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setPopupText("💖 " + props.location + " lagt til i favoritter");
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
                    src='../src/assets/heart-solid.svg'
                    alt='Hjerte'
                />
                <img src='../src/assets/heart-border.svg' alt='Hjerte' />
            </div>
            <Popup text={popupText || ''} show={isPopupShown} />
        </div>
    );
};

export default HeartButton;
