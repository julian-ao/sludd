import { useState } from 'react';
import './heartbutton.css';
import toast from 'react-hot-toast';

export type HeartButtonProps = {
    location: string;
};

const HeartButton = (props: HeartButtonProps) => {
    const [favorited, setFavorited] = useState(() => {
        // Check if the location is in local storage and return true if it is, false otherwise
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        return favorites.includes(props.location);
    });

    const toggleFavorite = () => {
        // Get the current favorites from local storage or initialize an empty array if it doesn't exist
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (favorited) {
            // If already favorited, remove the location from the favorites array
            const updatedFavorites = favorites.filter((fav: string) => fav !== props.location);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            toast('Removed from favorites', {
                icon: '💔',
            });
        } else {
            // If not favorited, add the location to the favorites array
            favorites.push(props.location);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            toast('Added to favorites', {
                icon: '💖',
            });
        }

        setFavorited(!favorited);
    };

    return (
        <div className='heart_div' onClick={toggleFavorite}>
            <img
                className='solid'
                style={favorited ? { opacity: 1 } : {}}
                src='../src/assets/heart-solid.svg'
                alt='Hjerte'
            />
            <img src='../src/assets/heart-border.svg' alt='Hjerte' />
        </div>
    );
};

export default HeartButton;
