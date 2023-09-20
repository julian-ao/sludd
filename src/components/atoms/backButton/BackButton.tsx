import { useNavigate } from 'react-router-dom';
import arrow from '../../../assets/arrow.svg';
import './backButton.css';

export type BackButtonProps = {
    to?: string;
};

const BackButton = ({ to }: BackButtonProps) => {
    const navigate = useNavigate();

    // Navigate back to previous page or to given path
    const handleBackClick = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <img
            src={arrow}
            alt=""
            className="back_button"
            style={{ transform: `rotate(90deg)` }}
            onClick={handleBackClick}
        />
    );
};

export default BackButton;
