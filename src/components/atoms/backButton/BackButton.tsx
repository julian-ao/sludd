import { useNavigate } from "react-router-dom";
import './backButton.css';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Use navigate(-1) to navigate back one page
    };

    return (
        <img
            src="/src/assets/arrow.svg"
            alt=""
            className='back_button'
            style={{ transform: `rotate(90deg)` }}
            onClick={handleBackClick}
        />
    );
}

export default BackButton;