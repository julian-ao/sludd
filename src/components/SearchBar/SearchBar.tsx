import { useState, useEffect, useRef, FC, useCallback } from 'react';
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import './SearchBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { LocationQueryData } from '../../lib/types';

export const API_URL = 'https://ws.geonorge.no/stedsnavn/v1/sted';

const SearchBar: FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement | null>(null);

    const { data, refetch } = useQuery({
        queryKey: ["cordinatesData"],
        enabled: false,
        queryFn: () => fetch(`${API_URL}?sok=${searchTerm}&fuzzy=true&utkoordsys=4258&treffPerSide=7&side=1`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            }),
    });

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            refetch().then(() => setShowDropdown(true));
        } else {
            setShowDropdown(false);
        }
    }, [refetch, searchTerm]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    const navigate = useNavigate();
    const handleSearch = useCallback(() => {
        if (searchTerm.trim() === '') {
            alert("Most likely not a valid place in Norway");
        } else {
            setShowDropdown(false);
            navigate(`/search?q=${searchTerm}`);
        }
    }, [navigate, searchTerm]);

    const handleSearchWithParam = useCallback((updatedSearchTerm: string) => {
        setSearchTerm(updatedSearchTerm);
        setShowDropdown(false);
    }, []);

    return (
        <div className='searchContainer' ref={searchBarRef}>
            <div
                className="searchBar"
                style={{
                    borderBottomLeftRadius: showDropdown ? 0 : '10px',
                    borderBottomRightRadius: showDropdown ? 0 : '10px'
                }}
                onFocus={() => setShowDropdown(true)}
            >
                <FaMapMarkerAlt size={18} color="#999" style={{ paddingLeft: "10px" }} />
                {/* <form onSubmit={(event) => { event.preventDefault(); handleSearch(); }}> */}
                <form
                    onSubmit={(event) => { event.preventDefault(); handleSearch(); }}
                    style={{ width: '100%', display: 'flex' }}
                >
                    <input
                        style={{ width: '100%', border: 'none', outline: 'none' }}
                        type="text"
                        placeholder="Søk på et sted i Norge..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />

                    {/* </form> */}
                    <button className='searchButton'>
                        <FaSearch size={25} color="#999" />
                    </button>
                </form>
            </div>
            {showDropdown && data && (
                <div className='searchDropdown'>
                    {(data as LocationQueryData)?.navn?.map((item, index: number) => (
                        <Link
                            className={`searchDropdownItem`}
                            key={index}
                            onClick={() => { handleSearchWithParam(item.stedsnavn?.[0]?.skrivemåte || ''); }}
                            to={`/location/${item?.stedsnavn?.[0]?.skrivemåte}/${item?.stedsnummer}`}
                        >
                            <FaMapMarkerAlt size={18} color="#999" style={{ paddingLeft: "10px" }} />
                            <div className='dropdownTextDiv'>
                                <h3>{item.stedsnavn?.[0]?.skrivemåte || ''}</h3>
                                <p>{item.navneobjekttype}{item.kommuner?.[0]?.kommunenavn && ', ' + item.kommuner?.[0]?.kommunenavn}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
