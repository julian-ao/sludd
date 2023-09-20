import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, test, describe } from 'vitest';
import SearchBar from './SearchBar';
import userEvent from '@testing-library/user-event';

// Mock the entire @tanstack/react-query module
vi.mock('@tanstack/react-query', async () => {
    const actualTanStack = await vi.importActual('@tanstack/react-query');
    return {
        ...(typeof actualTanStack === 'object' && actualTanStack !== null ? actualTanStack : {}),
        showDropdown: true,
        useQuery: vi.fn().mockReturnValue({
            data: {
                navn: [
                    {
                        stedsnavn: [
                            {
                                skrivemåte: 'Oslo',
                            },
                        ],
                        stedsnummer: '1',
                        navneobjekttype: 'By',
                        kommuner: [
                            {
                                kommunenummer: '0301',
                                kommunenavn: 'Oslo',
                            },
                        ],
                    },
                ],
            },
        }),
    };
});


const wrapper = ({ children }: React.PropsWithChildren<object>) => (
    <BrowserRouter>
        {children}
    </BrowserRouter>
);

describe('SearchBar', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanup();
    });

    test('render SearchBar with mock response', async () => {

        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <SearchBar />
            </QueryClientProvider>,
            { wrapper }
        );
        // Simulate user typing a search term
        const input = screen.getByPlaceholderText('Søk på et sted i Norge...');
        userEvent.type(input, 'Oslo');

        //TODO: test that the dropdown is shown and response is correct with mock

        expect(container).toMatchSnapshot();
    });

})