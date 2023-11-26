import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, test, describe } from 'vitest';
import LocationCard from '../components/molecules/card/LocationCard';

// Mock the entire @tanstack/react-query module
vi.mock('@tanstack/react-query', async () => {
    const actual = await vi.importActual('@tanstack/react-query');
    return {
        ...(typeof actual === 'object' && actual !== null ? actual : {}),
        useQuery: vi.fn().mockReturnValue({
            data: {
                properties: {
                    timeseries: [
                        {},
                        {
                            data: {
                                next_1_hours: {
                                    summary: {
                                        symbol_code: 'clearsky_day',
                                    },
                                },
                            },
                        },
                        {
                            data: {
                                instant: {
                                    details: {
                                        air_pressure_at_sea_level: 1000,
                                        air_temperature: 10,
                                        cloud_area_fraction: 0,
                                        relative_humidity: 0,
                                        wind_from_direction: 0,
                                        wind_speed: 0,
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        }),
    };
});

const wrapper = ({ children }: React.PropsWithChildren<object>) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe('LocationCard', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanup();
    });

    test('render LocationCard with mock response', async () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.4);

        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <LocationCard
                    locationData={{
                        representasjonspunkt: {
                            nord: 0,
                            øst: 0,
                        },
                        stedsnavn: [{ skrivemåte: 'Test' }],
                        stedsnummer: '',
                        navneobjekttype: undefined,
                        kommuner: undefined,
                    }}
                />
            </QueryClientProvider>,
            { wrapper },
        );
        expect(container).toMatchSnapshot();
    });
});
