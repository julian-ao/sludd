import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';


const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="searchBar">
            <input
              type="text"
              placeholder="Search for a city or place in Norway..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
            />
            <button onClick={handleSearch} className='searchButton'>
                <FaSearch size={32} color="gray" /> 
            </button>
        </div>
    );
};

export default SearchBar;
