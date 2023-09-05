import { ReactNode } from 'react';

type LocationProps = {
    children: ReactNode;
};

const Location_page = ({children} : LocationProps) => {
    return <div className="location_body">
        {children}
    </div>
};

export default Location_page;