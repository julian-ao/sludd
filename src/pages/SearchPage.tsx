import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import SearchBar from '../components/molecules/searchBar/SearchBar';
import Pagination from '../components/molecules/pagination/Pagination';
import { LocationQueryData } from '../lib/types';
import LocationCardsView from '../components/views/locationCardsView/LocationCardsView';
import FilterSkeleton from '../components/molecules/filterSkeleton/FilterSkeleton';
import BackButton from '../components/atoms/backButton/BackButton';
import './searchPage.css';
import SluddLogo from '../assets/sluddLogo.svg';

export const API_URL = 'https://ws.geonorge.no/stedsnavn/v1/sted';
const hitsPerPage = 12;

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || undefined;
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const storedFilters = window.sessionStorage.getItem('filters');
    const initialFilters = storedFilters ? JSON.parse(storedFilters) : [];
    const [filters, setFilters] = useState<string[]>(initialFilters);
    const [filterString, setFilterString] = useState<string>(
        filters
            .map((filter) => `&navneobjekttype=${filter.toLowerCase()}`)
            .join('') || '',
    );

    // Types of filters that can be applied
    const filterTypes = [
        'Adressenavn',
        'By',
        'Bydel',
        'Gard',
        'Forretningsbygg',
        'Bruk',
        'Tjern',
        'Skole',
    ];
    const filter =
        'navn.representasjonspunkt,navn.stedsnavn.skrivemåte,navn.navneobjekttype,navn.stedsnummer,navn.kommuner,metadata';

    // Fetch data from API using react-query, based on search term, filtering and pagination
    const { data, isLoading, refetch } = useQuery<LocationQueryData>({
        queryKey: ['locationData', searchTerm],
        queryFn: () =>
            fetch(
                `${API_URL}?sok=${searchTerm}${filterString}&fuzzy=true&utkoordsys=4258&treffPerSide=${hitsPerPage}&side=${currentPage}&filtrer=${filter}`,
            ).then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            }),
    });

    // Update sessionStorage when filters are applied, then
    // set currentPage to 1 and refetch data
    useEffect(() => {
        window.sessionStorage.setItem('filters', JSON.stringify(filters));
        const filterStringArray = filters.map(
            (filter) => `&navneobjekttype=${filter.toLowerCase()}`,
        );
        const newFilterString = filterStringArray.join('');

        setFilterString(newFilterString);
        setCurrentPage(1);
        refetch();
    }, [filterString, filters, refetch]);

    // Set maxPage whenever new data is fetched
    useEffect(() => {
        if (data) {
            const totalTreff = data.metadata?.totaltAntallTreff ?? 0;
            setMaxPage(Math.ceil(totalTreff / hitsPerPage));
        }
    }, [data]);

    // Refetch data when currentPage changes
    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    // Navigate to home page when logo is clicked
    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="searchPageContainer">
            <img
                src={SluddLogo}
                alt="Sludd Logo"
                id="logo"
                onClick={handleLogoClick}
            />
            <div className="searchPageHeaderDiv">
                <div className="backButtonDiv">
                    <BackButton to="/" />
                </div>
                <SearchBar
                    onSearch={() => {
                        setCurrentPage(1);
                    }}
                />
            </div>
            <FilterSkeleton
                title={'Filter'}
                values={filterTypes}
                currentFilters={filters}
                setFilters={setFilters}
            />
            {isLoading ? (
                <p className="resultText">Laster...</p>
            ) : data && data?.navn?.length > 0 ? (
                <LocationCardsView locationData={data.navn} />
            ) : (
                <p className="resultText">Ingen resultater for dette søket</p>
            )}
            <Pagination
                currentPage={currentPage}
                maxPage={maxPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default SearchPage;
