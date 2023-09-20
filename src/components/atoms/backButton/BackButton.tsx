import { useNavigate } from 'react-router-dom';
import './backButton.css';

export type BackButtonProps = {
    to?: string;
};

const BackButton = ({ to }: BackButtonProps) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <img
            src="/src/assets/arrow.svg"
            alt=""
            className="back_button"
            style={{ transform: `rotate(90deg)` }}
            onClick={handleBackClick}
        />
    );
};

export default BackButton;
