import { cleanup, render } from '@testing-library/react'
import SearchBar from './SearchBar'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { LocationQueryData } from '../../../lib/types';
import React from 'react';

const wrapper = ({ children }: React.PropsWithChildren<object>) => (
    <BrowserRouter>
        {children}
    </BrowserRouter>
)

describe('SearchBar', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanup();
    });

    it('should render correctly', async () => {
        const mockResponse = {
            navn: [
                {
                    representasjonspunkt: {
                        nord: 1,
                        øst: 1,
                    },
                    stedsnavn: [
                        {
                            skrivemåte: 'Oslo',
                        },
                    ],
                    stedsnummer: '1',
                    kommuner: [
                        {
                            kommunenummer: '1',
                            kommunenavn: 'Oslo',
                        },
                    ],
                },
            ],
        } as LocationQueryData;
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: vi.fn().mockResolvedValueOnce(mockResponse),
        } as never);


        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <SearchBar />
            </QueryClientProvider>,
            { wrapper },
        );
        expect(container).toMatchSnapshot();
    });
});