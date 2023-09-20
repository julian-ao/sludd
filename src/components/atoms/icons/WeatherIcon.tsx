import { useEffect, useState } from 'react';

type WeatherIconProps = {
    symbol_code: string;
    size?: number;
};

const WeatherIcon = ({ symbol_code, size }: WeatherIconProps) => {
    const [weatherIcon, setWeatherIcon] = useState<string>();

    useEffect(() => {
        (async () => {
            if (!symbol_code) {
                return;
            }
            const icon = await import(
                `../../../assets/metno-icons/${symbol_code}.svg`
            );
            setWeatherIcon(icon.default);
        })();
    }, [symbol_code]);

    return (
        <img
            src={weatherIcon}
            alt={symbol_code}
            height={size ? size : 40}
            width={size ? size : 40}
        />
    );
};

export default WeatherIcon;
