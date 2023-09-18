import { useState, useEffect, useRef, FC, useCallback } from 'react';
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { LocationQueryData } from '../../lib/types';
import './SearchBar.css';

export const API_URL = 'https://ws.geonorge.no/stedsnavn/v1/sted';

const SearchBar: FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
    const [lastKeyPressed, setLastKeyPressed] = useState<string>('');
    const navigate = useNavigate();

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
            if (!['ArrowUp', 'ArrowDown'].includes(lastKeyPressed)) {
                refetch().then(() => setShowDropdown(true)).then(() => setSelectedOptionIndex(-1));
            }
        }
    }, [searchTerm]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
            setSelectedOptionIndex(-1);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    const handleSearch = useCallback(() => {
        if (searchTerm.trim() === '') {
            alert("Ikke et gyldig sted i Norge");
        } else {
            setShowDropdown(false);
            navigate(`/search?q=${searchTerm}`);
        }
    }, [navigate, searchTerm]);

    // Handle key up events (Enter, ArrowUp, ArrowDown)
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setLastKeyPressed(event.key);
        if (event.key === 'Enter') {
            if (selectedOptionIndex >= 0) {
                const selectedItem = data?.navn[selectedOptionIndex];
                navigate(`/location/${selectedItem?.stedsnavn?.[0]?.skrivemåte}/${selectedItem?.stedsnummer}`);
            } else if (searchTerm.trim() !== '') {
                handleSearch();
            }
        } else if (['ArrowUp', 'ArrowDown'].includes(event.key) && showDropdown) {
            const itemCount = data?.navn?.length || 0;
            if (itemCount > 0) {
                let newIndex = (selectedOptionIndex + (event.key === 'ArrowUp' ? -1 : 1) + itemCount) % itemCount;
                newIndex = newIndex < 0 ? itemCount - 1 : newIndex;
                setSelectedOptionIndex(newIndex);
                setSearchTerm(data?.navn[newIndex].stedsnavn?.[0]?.skrivemåte || '');
            }
        }
    };

    return (
        <div className='searchContainer' ref={searchBarRef}>
            <div
                className="searchBar"
                style={{
                    borderBottomLeftRadius: showDropdown ? 0 : '10px',
                    borderBottomRightRadius: showDropdown ? 0 : '10px'
                }}
            >
                <FaMapMarkerAlt size={18} color="#999" style={{ paddingLeft: "10px" }} />
                <input
                    type="text"
                    placeholder="Søk på et sted i Norge..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    onKeyUp={handleKeyPress}
                />
                <button className='searchButton' onClick={handleSearch}>
                    <FaSearch size={25} color="#999" />
                </button>
            </div>
            {showDropdown && data && (
                <div className='searchDropdown'>
                    {(data as LocationQueryData)?.navn?.map((item, index: number) => (
                        <Link
                            className={`searchDropdownItem ${index === selectedOptionIndex ? 'selectedDropdownItem' : ''}`}
                            key={index}
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
