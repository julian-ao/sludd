import { cleanup, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { WeatherQueryData } from '../../../lib/types';
import LocationCard from './LocationCard';

const wrapper = ({ children }: React.PropsWithChildren<object>) => (
    <BrowserRouter>
        {children}
    </BrowserRouter>
)

describe('LocationCard', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanup();
    });

    it('render LocationCard with mock response', async () => {
        const mockResponse = {
            properties: {
                meta: {
                    updated_at: '2021-09-27T12:00:00Z',
                },
                timeseries: [
                    {
                        time: '2021-09-27T12:00:00Z',
                        data: {
                            instant: {
                                details: {
                                    air_temperature: 10,
                                    wind_speed: 5,
                                    relative_humidity: 10,
                                    wind_from_direction: 10,
                                },
                            },
                            next_1_hours: {
                                summary: {
                                    symbol_code: 'clearsky_day',
                                },
                                details: {
                                    precipitation_amount: 0,
                                },
                            },
                        },
                    },
                ],
            },
        } as WeatherQueryData;

        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: vi.fn().mockResolvedValueOnce(mockResponse),
        } as never);

        vi.spyOn(Math, 'random').mockReturnValue(0.4);

        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <LocationCard locationData={{
                    representasjonspunkt: {
                        nord: 0,
                        øst: 0
                    },
                    stedsnavn: [{ skrivemåte: 'test' }],
                    stedsnummer: 'test',
                }} />
            </QueryClientProvider>,
            { wrapper },
        );
        expect(container).toMatchSnapshot();
    });
});