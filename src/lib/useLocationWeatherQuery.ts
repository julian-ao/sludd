import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LocationQueryData, WeatherQueryData } from "./types";

export const useLocationWeatherQuery = (location: string, navneobjekttype?: string, filter?: string) => {
    const [locationData, setLocationData] = useState<LocationQueryData | null>(
        null,
    );

    const locationQuery = useQuery<LocationQueryData, unknown>(
        ["location", location],
        () => {
            let base_url = `https://ws.geonorge.no/stedsnavn/v1/sted?sok=${location}&utkoordsys=4258&treffPerSide=1&side=1&filtrer=navn.representasjonspunkt,navn.stedsnavn.skrivemåte,navn.navneobjekttype`;
    
            // Legg til 'navneobjekttype' til URL hvis den er definert
            if (navneobjekttype) {
                base_url += `&navneobjekttype=${navneobjekttype.toLowerCase()}`;
            }
    
            return fetch(base_url).then((res) => res.json());
        }
    );

    useEffect(() => {
        if (locationQuery.isSuccess) {
            setLocationData(locationQuery.data!);
        }
    }, [locationQuery]);

    const weatherQuery = useQuery<WeatherQueryData, unknown>(
        ["weather", locationData?.navn[0].representasjonspunkt, location],
        () =>
            fetch(
                `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${locationData?.navn[0].representasjonspunkt.nord}&lon=${locationData?.navn[0].representasjonspunkt.øst}`,
            ).then((res) => res.json()),
        {
            enabled: !!locationData,
        },
    );

    return { locationData, weatherQuery };
};

