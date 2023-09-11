import { useState, useEffect } from 'react';

// Components
import './HomePage.css';
import SluddLogo from '../assets/SluddLogo.svg';
import SearchBar from '../components/SearchBar/SearchBar';
import LocationCardsView from '../components/views/LocationCardsView/LocationCardsView';

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

    return (
        <div className="homePageContainer">
            <img src={SluddLogo} alt="Sludd Logo" />
            <h1 className='greetingHeader'>{greeting}</h1>
            <SearchBar />
            <LocationCardsView locationIds={[
                '509924',
                '307915',
                '239083',
                '369108',
                '915103',
                '1072407',
                '997111',
                '570647',
                '406320',
                '480914',
                '911117',
                '61929',
                '1066023',
                '1025564',
                '892087'
            ]} />
        </div>
    );
}