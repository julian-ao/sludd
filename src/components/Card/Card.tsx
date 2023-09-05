
import { ReactNode } from 'react';


type CardProps = {
    children: ReactNode;
};

const Card = ({ children }: CardProps) => {
    return <div className="card">{children}</div>;
};

export default Card;