import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { LocationQueryData } from '../../../lib/types';
import './searchBar.css';
import Popup from '../../atoms/popup/Popup';

export const API_URL = 'https://ws.geonorge.no/stedsnavn/v1/sted';

type SearchBarProps = {
    onSearch?: () => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
    const [lastKeyPressed, setLastKeyPressed] = useState<string>('');
    const [isPopupShown, setIsPopupShown] = useState<boolean>(false);
    const navigate = useNavigate();

    // Fetch data from API based on search term, with fuzzy search true and hit limit 7
    const { data, refetch } = useQuery({
        queryKey: ['cordinatesData'],
        enabled: false,
        queryFn: () =>
            fetch(
                `${API_URL}?sok=${searchTerm}&fuzzy=true&utkoordsys=4258&treffPerSide=7&side=1`,
            ).then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            }),
    });

    // Refetch data when search term changes,
    // then set showSropdown true  and reset selected option index
    useEffect(() => {
        if (searchTerm.trim() !== '') {
            if (!['ArrowUp', 'ArrowDown'].includes(lastKeyPressed)) {
                refetch()
                    .then(() => setShowDropdown(true))
                    .then(() => setSelectedOptionIndex(-1));
            }
        }
    }, [searchTerm]);

    // Handle click outside of search bar and set showDropdown false
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target as Node)
        ) {
            setShowDropdown(false);
            setSelectedOptionIndex(-1);
        }
    }, []);

    // Add event listener for click outside of search bar
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    // Handle search if search term is not empty and navigate to search page
    const handleSearch = useCallback(() => {
        if (searchTerm.trim() === '') {
            showPopup();
        } else {
            setShowDropdown(false);
            if (onSearch) onSearch();
            navigate(`/search?q=${searchTerm}`);
        }
    }, [navigate, searchTerm]);

    // Handle key up events (Enter, ArrowUp, ArrowDown)
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setLastKeyPressed(event.key);
        if (event.key === 'Enter') {
            if (selectedOptionIndex >= 0) {
                const selectedItem = data?.navn[selectedOptionIndex];
                navigate(
                    `/location/${selectedItem?.stedsnavn?.[0]?.skrivemåte}/${selectedItem?.stedsnummer}`,
                );
            } else {
                handleSearch();
            }
        } else if (
            ['ArrowUp', 'ArrowDown'].includes(event.key) &&
            showDropdown
        ) {
            const itemCount = data?.navn?.length || 0;
            if (itemCount > 0) {
                let newIndex =
                    (selectedOptionIndex +
                        (event.key === 'ArrowUp' ? -1 : 1) +
                        itemCount) %
                    itemCount;
                newIndex = newIndex < 0 ? itemCount - 1 : newIndex;
                setSelectedOptionIndex(newIndex);
                setSearchTerm(
                    data?.navn[newIndex].stedsnavn?.[0]?.skrivemåte || '',
                );
            }
        }
    };

    // Show popup for 1.5 seconds
    const showPopup = () => {
        setIsPopupShown(true);

        setTimeout(() => {
            setIsPopupShown(false);
        }, 1500);
    };

    return (
        <div className="searchContainer" ref={searchBarRef}>
            <Popup text={'🔍 Skriv inn et søkeord'} show={isPopupShown} />
            <div
                className="searchBar"
                style={{
                    borderBottomLeftRadius:
                        showDropdown && data?.navn?.length > 0 ? 0 : '10px',
                    borderBottomRightRadius:
                        showDropdown && data?.navn?.length > 0 ? 0 : '10px',
                }}
            >
                <FaMapMarkerAlt
                    size={18}
                    color="#999"
                    style={{ paddingLeft: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Søk på et sted i Norge..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    onKeyUp={handleKeyPress}
                />
                <button className="searchButton" onClick={handleSearch}>
                    <FaSearch size={25} color="#999" />
                </button>
            </div>
            {showDropdown && data && (
                <div
                    className="searchDropdown"
                    style={{
                        borderTop:
                            data?.navn?.length > 0
                                ? '1px solid #C7C7C7'
                                : 'none',
                    }}
                >
                    {(data as LocationQueryData)?.navn?.map(
                        (item, index: number) => (
                            <Link
                                className={`searchDropdownItem ${
                                    index === selectedOptionIndex
                                        ? 'selectedDropdownItem'
                                        : ''
                                }`}
                                key={index}
                                to={`/location/${item?.stedsnavn?.[0]?.skrivemåte}/${item?.stedsnummer}`}
                            >
                                <FaMapMarkerAlt
                                    size={18}
                                    color="#999"
                                    style={{ paddingLeft: '10px' }}
                                />
                                <div className="dropdownTextDiv">
                                    <h3>
                                        {item.stedsnavn?.[0]?.skrivemåte || ''}
                                    </h3>
                                    <p>
                                        {item.navneobjekttype}
                                        {item.kommuner?.[0]?.kommunenavn &&
                                            ', ' +
                                                item.kommuner?.[0]?.kommunenavn}
                                    </p>
                                </div>
                            </Link>
                        ),
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
