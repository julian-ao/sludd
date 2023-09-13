import { useState, useEffect } from 'react';

// Components
import './HomePage.css';
import SluddLogo from '../assets/SluddLogo.svg';
import SearchBar from '../components/SearchBar/SearchBar';

export default function HomePage() {
    const [greeting, setGreeting] = useState('');

    // Function to get the current time and set the greeting message and background
    const getGreeting = () => {
        const currentTime = new Date().getHours();
        const greetings = ['God natt', 'God morgen', 'God ettermiddag', 'God kveld'];
        const greetingIndex =
            currentTime >= 4 && currentTime < 12 ? 1 :
                currentTime >= 12 && currentTime < 17 ? 2 :
                    currentTime >= 17 && currentTime < 21 ? 3 : 0;

        setGreeting(greetings[greetingIndex]);
    };

    useEffect(() => {
        getGreeting();
    }, []);

    // TODO: show favorite locations based on location data from local storage

    return (
        <div className="homePageContainer">
            <img src={SluddLogo} alt="Sludd Logo" />
            <h1 className='greetingHeader'>{greeting}</h1>
            <SearchBar />
        </div>
    );
}
