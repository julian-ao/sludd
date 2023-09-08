import { useEffect, useState } from "react";

const WeatherIcon = ({ symbol_code }: { symbol_code: string }) => {

    const [weatherIcon, setWeatherIcon] = useState<string>();

    useEffect(() => {
        (async () => {
            if (!symbol_code) {
                return;
            }
            const icon = await import(`../../../assets/metno-icons/${symbol_code}.svg`);
            setWeatherIcon(icon.default);
        })();
    }, [symbol_code]);


    return (
        <img src={weatherIcon} alt={symbol_code} height={40} width={40} />
    );
}

export default WeatherIcon;