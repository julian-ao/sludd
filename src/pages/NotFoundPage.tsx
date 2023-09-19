import './NotFoundPage.css';
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <h1 className='notFoundHeader'>Oops!</h1>
            <h2 className='notFoundText'>404 side ikke funnet</h2>
            <p className='notFoundDescription'>Siden du leter etter finnes dessverre ikke. </p>
            <p className='notFoundDescription'>Trykk på knappen under for å returnere til hjemsiden. </p>
            <button className='goHomeButton' onClick={() => navigate("/")}>Gå til hjemskjerm</button>
        </div>
    );
}

export default NotFoundPage;
