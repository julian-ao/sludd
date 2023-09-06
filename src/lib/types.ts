export type LocationQueryData = {
    navn: {
        representasjonspunkt: {
            nord: number;
            øst: number;
        };
        stedsnavn: {
            skrivemåte: string;
        }[];
    }[];
};

export type WeatherQueryData = {
    properties: {
        timeseries: {
            time: string;
            data: {
                instant: {
                    details: {
                        air_temperature: number;
                        wind_speed: number;
                        relative_humidity: number;
                    };
                };
                next_1_hours: {
                    summary: {
                        symbol_code: string;
                    };
                    details: {
                        precipitation_amount: number;
                    };
                };
            };
        }[];
    };
};
