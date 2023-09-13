import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar/SearchBar';
import LocationCardsView from '../components/views/LocationCardsView/LocationCardsView';
import { LocationQueryData } from '../lib/types';

const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || undefined;

    const filter = "navn.representasjonspunkt,navn.stedsnavn.skrivemåte,navn.navneobjekttype,navn.stedsnummer,navn.kommuner"

    const { data, isLoading } = useQuery<LocationQueryData>({
        queryKey: ["locationData", searchTerm],
        queryFn: () => fetch(`https://ws.geonorge.no/stedsnavn/v1/sted?sok=${searchTerm}&fuzzy=true&utkoordsys=4258&treffPerSide=9&side=1&filtrer=${filter}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            }),
    });

    //TODO: add pagination
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', backgroundColor: '#87CEEB' }}>
            <SearchBar />
            {isLoading && <p>Loading...</p>}
            {data && <LocationCardsView locationData={data} />}
        </div>
    );
};

export default SearchPage;