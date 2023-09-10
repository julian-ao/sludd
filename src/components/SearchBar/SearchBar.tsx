import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
    const [lastKeyPressed, setLastKeyPressed] = useState<string>('');
    const searchBarRef = useRef<HTMLDivElement | null>(null);


    // Fetch data from API with searchTerm and fuzzy search = true
    const { data, refetch } = useQuery({
        queryKey: ["cordinatesData"],
        enabled: false,
        queryFn: () =>
            fetch(`https://ws.geonorge.no/stedsnavn/v1/navn?sok=${searchTerm}&fuzzy=true&utkoordsys=4258&treffPerSide=7&side=1`)
        .then((res) => res.json()),
    });

    // Fetch data from API and showDropdown when searchTerm changes
    useEffect(() => {
        if (searchTerm.trim() !== '') {0
            if (!['ArrowUp', 'ArrowDown', 'Enter'].includes(lastKeyPressed)) {
                refetch().then(() => setShowDropdown(true));
            }
        } else {
            setShowDropdown(false);
        }
    }, [searchTerm]);


    // Detect clicks outside of the dropdown and close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                closeDropDown();
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    // Handle search that calls onSearch function prop and close dropdown
    function handleSearch() {
        if (searchTerm.trim() === '') {
           alert("Mostl likely not a valid place in Norway")
        } else {
            closeDropDown();
            console.log("Search for: " + searchTerm);
        }
    }

    // Handle search with parameter that calls onSearch function prop and close dropdown
    function handleSearchWithParam(updatedSearchTerm: string) {
        setSearchTerm(updatedSearchTerm)
        closeDropDown();
        console.log("Search for: " + searchTerm);
    }


    // Close dropdown and reset selectedOptionIndex
    function closeDropDown() {
        setShowDropdown(false);
        setSelectedOptionIndex(-1);
    }


    // Handle key up events (Enter, ArrowUp, ArrowDown)
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setLastKeyPressed(event.key);
        if (event.key === 'Enter') {
            handleSearch();
        } else if (['ArrowUp', 'ArrowDown'].includes(event.key) && showDropdown) {
            const itemCount = data?.navn?.length || 0;
            if (itemCount > 0) {
                let newIndex = (selectedOptionIndex + (event.key === 'ArrowUp' ? -1 : 1) + itemCount) % itemCount;
                newIndex = newIndex < 0 ? itemCount - 1 : newIndex;
                setSelectedOptionIndex(newIndex);
                setSearchTerm(data?.navn[newIndex].skrivemåte || '');
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
                <FaMapMarkerAlt size={18} color="#999" style={{paddingLeft: "10px"}} />
                <input
                  type="text"
                  placeholder="Søk på et sted i Norge..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyUp={handleKeyPress}
                />
                <button onClick={handleSearch} className='searchButton'>
                    <FaSearch size={25} color="#999" />
                </button>
            </div>
            {showDropdown && data && (
                <div className='searchDropdown'>
                    {data.navn.map((item: any, index: number) => (
                        <div
                          className={`searchDropdownItem ${index === selectedOptionIndex ? 'selectedDropdownItem' : ''}`}
                          key={index}
                          onClick={() => {handleSearchWithParam(item.skrivemåte)}}
                        >
                            <FaMapMarkerAlt size={18} color="#999" style={{paddingLeft: "10px"}} />
                            <div className='dropdownTextDiv'>
                                <h3>{item.skrivemåte}</h3>
                                <p>{item.navneobjekttype}, {item.kommuner[0].kommunenavn}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
