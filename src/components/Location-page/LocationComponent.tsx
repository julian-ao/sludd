import './location_page.css'

type LocationProps = {
    location: string;
};

const LocationComponent = ({location} : LocationProps) => {
    return <div className="location_main">
        <div className="location_header">
            <div className='location_header_name'>
                <img src="../src/assets/heart.svg" alt='Hjerte'/>
                <h1>Navn</h1>
            </div>
            <div className='location_header_info'>
                <h1>Grader *C</h1>
                <img src="../src/assets/sun.svg" alt='Vær'/>
            </div>
        </div>
        <div className='location_body'>
            <table>
                <thead>
                    <tr>
                        <th>Tid</th>
                        <th>Vær</th>
                        <th>Temp.</th>
                        <th>Nedbør</th>
                        <th>Vind(kast) m/s</th>
                        <th>Luftfuktighet</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Klokka</td>
                        <td>Sol</td>
                        <td>23*C</td>
                        <td>3.4mm</td>
                        <td>1 m/s</td>
                        <td>Fuktig</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
};

export default LocationComponent;