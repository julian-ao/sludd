import { useState, useEffect } from 'react';

// Components
import './HomePage.css';
import SluddLogo from '../assets/SluddLogo.svg';
import SearchBar from '../components/SearchBar/SearchBar';
import LocationCardsView from '../components/views/LocationCardsView/LocationCardsView';
import FilterSkeleton from '../components/molecules/FilterSkeleton/FilterSkeleton';

export default function HomePage() {
    const [greeting, setGreeting] = useState('');

    const [favoriteLocations, setFavoriteLocations] = useState<string[]>([]);

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
        const favoriteLocations = localStorage.getItem('favorites');
        favoriteLocations && setFavoriteLocations(JSON.parse(favoriteLocations));
    }, []);

    return (
        <div className="homePageContainer">
            <div className='homePageContent'>
                <img src={SluddLogo} alt="Sludd Logo" />
                <h1 className='greetingHeader'>{greeting}</h1>
                <SearchBar />
                <div style={{ display: 'flex', gap: '3rem' }}>
                    <FilterSkeleton title={'Filtrer'} type={'filter'} values={['By', 'Tettbebyggelse', 'Fylke', 'Elv']} />
                    <FilterSkeleton title={'Sorter'} type={'sort'} values={['Temperatur - synkende', 'Temperatur - stigende']} />
                </div>
                <div className='favoritesHeader'>
                    Favoritter
                </div>
                {
                    favoriteLocations.length === 0 ?
                        <div className='noFavoritesText'>
                            Du har ingen favoritter enda. Legg til en ved å søke på et sted.
                        </div>
                        : <LocationCardsView locations={favoriteLocations} />
                }
            </div>
        </div>
    );
}
