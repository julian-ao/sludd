export type LocationQueryData = {
    navn: {
        representasjonspunkt: {
            nord: number;
            øst: number;
        };
        stedsnavn: {
            skrivemåte: string;
        }[];
        navneobjekttype: string;
    }[];
};

export type WeatherQueryData = {
    properties: {
        timeseries: {
            data: {
                instant: {
                    details: {
                        air_temperature: number;
                    };
                };
                next_1_hours: {
                    summary: {
                        symbol_code: string;
                    };
                };
            };
        }[];
    };
};
