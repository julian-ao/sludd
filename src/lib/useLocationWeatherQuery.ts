import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LocationQueryData, WeatherQueryData } from "./types";

interface locationName {
    locationName: string;
    filter?: string;
}

interface locationId {
    locationId: string;
    filter?: string;
}

// Custom hook for fetching weather data based on locationName or locationId
export const useLocationWeatherQuery = (data: locationName | locationId) => {

    const [locationData, setLocationData] = useState<LocationQueryData | null>(
        null,
    );

    // Fetch location data (cordinates) based on locationName or locationId
    const locationQuery = useQuery<LocationQueryData, unknown>(
        ["location", data],
        async () => {
            if ("locationId" in data && data.locationId) {
                const url = `https://ws.geonorge.no/stedsnavn/v1/sted?stedsnummer=${
                    data.locationId
                }&utkoordsys=4258${
                    data.filter ? `&filtrer=${data.filter}` : ""
                }`;
                const res = await fetch(url);
                return res.json();
            } else if ("locationName" in data) {
                const base_url = `https://ws.geonorge.no/stedsnavn/v1/sted?sok=${data.locationName}&utkoordsys=4258&treffPerSide=1&side=1&filtrer=navn.representasjonspunkt,navn.stedsnavn.skrivemåte,navn.navneobjekttype,navn.stedsnummer`;
                const res = await fetch(base_url);
                return res.json();
            }

            throw new Error("Invalid data");
        },
    );

    // Set locationData when locationQuery is successful
    useEffect(() => {
        if (locationQuery.isSuccess) {
            setLocationData(locationQuery.data!);
        }
    }, [locationQuery]);

    // Fetch weather data based on cords from locationData
    const weatherQuery = useQuery<WeatherQueryData, unknown>(
        ["weather", locationData?.navn[0].representasjonspunkt, location],
        async () => {
            const res = await fetch(
                `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${locationData?.navn[0].representasjonspunkt.nord}&lon=${locationData?.navn[0].representasjonspunkt.øst}`,
            );
            return res.json();
        },
        {
            enabled: !!locationData,
        },
    );

    return { locationData, weatherQuery };
};
