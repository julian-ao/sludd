import './popup.css';

export type PopupProps = {
    text: string;
    show: boolean;
};

const Popup = (props: PopupProps) => {
    return (
        <div className={`popup ${props.show ? 'show' : ''}`}>
            <div className="popup-content">
                <p>{props.text}</p>
            </div>
        </div>
    );
};

export default Popup;
