import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/molecules/searchBar/SearchBar';
import LocationCardsView from '../components/views/locationCardsView/LocationCardsView';
import BackButton from '../components/atoms/backButton/BackButton';
import { LocationQueryData } from '../lib/types';
import FilterSkeleton from '../components/molecules/filterSkeleton/FilterSkeleton';
import { useEffect, useState } from 'react';
import './searchPage.css';

const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || undefined;

    const [filters, setFilters] = useState<string[]>([]);
    const [filterString, setFilterString] = useState<string>('');

    //TODO: what filter types should be included?
    const filterTypes = ['Adressenavn', 'By', 'Bydel', 'Gard', 'Forretningsbygg', 'Bruk', 'Øy i sjø', 'Tjern', 'Skole']

    const filter = "navn.representasjonspunkt,navn.stedsnavn.skrivemåte,navn.navneobjekttype,navn.stedsnummer,navn.kommuner"

    const { data, isLoading, refetch } = useQuery<LocationQueryData>({
        queryKey: ["locationData", searchTerm],
        queryFn: () => fetch(`https://ws.geonorge.no/stedsnavn/v1/sted?sok=${searchTerm}${filterString}&fuzzy=true&utkoordsys=4258&treffPerSide=9&side=1&filtrer=${filter}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            }),
    });

    useEffect(() => {
        // Loop through filters and place each filter in setFilterString in this format: "&navneobjekttype=filter"
        const filterStringArray = filters.map(filter => `&navneobjekttype=${filter.toLowerCase()}`);
        const newFilterString = filterStringArray.join('');

        setFilterString(newFilterString);
        refetch();
    }, [filterString, filters, refetch]);

    //TODO: add pagination
    return (
        <div className='searchPageContainer'>
            <div className='searchPageHeaderDiv'>
                <div className='backButtonDiv'>
                    <BackButton to="/" />
                </div>
                <SearchBar />
            </div>
            <FilterSkeleton title={'Filter'} values={filterTypes} currentFilters={filters} setFilters={setFilters} />
            {isLoading && <p>Loading...</p>}
            {data && <LocationCardsView locationData={data.navn} />}
        </div>
    );
};

export default SearchPage;