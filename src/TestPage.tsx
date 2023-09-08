import { Link } from 'react-router-dom'


// Components
import SearchBar from './components/SearchBar/SearchBar'

const TestPage = () => {

    function handleSearchForPlaces(searchTerm: string) {
        console.log('Searching for:', searchTerm);
    }
    
    return (
        <>
            <Link to="/">
                <button className="bg-primary-500 text-white absolute rounded-md px-2 py-1">
                    Go back
                </button>
            </Link>
            <div className="w-full h-screen flex justify-center">
                <SearchBar onSearch={handleSearchForPlaces} />
            </div>
        </>
    )
}

export default TestPage