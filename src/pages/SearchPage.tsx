import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar, { API_URL } from '../components/SearchBar/SearchBar';
import LocationCardsView from '../components/views/LocationCardsView/LocationCardsView';
import { LocationQueryData } from '../lib/types';

const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || undefined;
    const [locationIds, setLocationIds] = useState<string[]>([]);

    const searchUrl = `${API_URL}?sok=${searchTerm}&fuzzy=true&utkoordsys=4258&treffPerSide=15&side=1`;
    console.log(searchUrl);
    useQuery<LocationQueryData, unknown>({
        queryKey: ["locationData", searchTerm],
        queryFn: () => fetch(`${API_URL}?sok=${searchTerm}&fuzzy=true&utkoordsys=4258&treffPerSide=9&side=1&filtrer=navn.stedsnummer,metadata`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            }),
        onSuccess: (data) => {
            setLocationIds(data.navn.map((item) => item.stedsnummer.toString()))
        }
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', backgroundColor: '#87CEEB' }}>
            <SearchBar />
            <LocationCardsView locationIds={locationIds} />
        </div>


    );
};

export default SearchPage;
