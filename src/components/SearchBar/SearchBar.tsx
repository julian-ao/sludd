import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
    const dropdownRef = useRef<HTMLDivElement | null>(null);


    // Fetch data from API with searchTerm 
    const { data, refetch } = useQuery({
        queryKey: ["cordinatesData"],
        queryFn: () =>
            fetch(`https://ws.geonorge.no/stedsnavn/v1/navn?sok=${searchTerm}&fuzzy=true&utkoordsys=4258&treffPerSide=7&side=1`)
        .then((res) => res.json()),
        enabled: false,
        onSuccess: () => {
            setSearchTerm(searchTerm);
          },
    });

    // Detect clicks outside of the dropdown and close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
                setSelectedOptionIndex(-1); // Reset selectedOptionIndex
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    // Handle search
    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
        setShowDropdown(false);
    };

    // Handle input change and then fetch data from API
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if (searchTerm.trim() !== '' && event.target.value.length > 0) {
            refetch();
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    // Handle key up events (Enter, ArrowUp, ArrowDown) 
    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm.length > 0) {
            setSearchTerm(data.navn[selectedOptionIndex].skrivemåte)
            handleSearch();
        } else if (event.key === 'ArrowUp') {
            if (selectedOptionIndex > 0 && showDropdown) {
                setSelectedOptionIndex(selectedOptionIndex - 1);
            }
        } else if (event.key === 'ArrowDown' && showDropdown) {
            if (selectedOptionIndex < 6) {
                setSelectedOptionIndex(selectedOptionIndex + 1);
            }
        }
    };

    return (
        <div className='searchContainer'>
            <div className="searchBar">
                <input
                  type="text"
                  placeholder="Search for a place in Norway..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyUp={handleKeyUp}
                />
                <button onClick={handleSearch} className='searchButton'>
                    <FaSearch size={25} color="gray" /> 
                </button>
            </div>
            {showDropdown && data && (
                <div className='searchDropdown' ref={dropdownRef}>
                    {data.navn.map((item: any, index: number) => (
                        <div 
                          className={`searchDropdownItem ${index === selectedOptionIndex ? 'selectedDropdownItem' : ''}`} 
                          key={index}
                          onClick={() => {
                            setSearchTerm(item.skrivemåte);
                            handleSearch();
                          }}
                        >
                            <p>{item.skrivemåte}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
