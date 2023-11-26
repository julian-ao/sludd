import { describe, vi } from 'vitest';
import HeartButton from '../components/atoms/heartButton/HeartButton';
import { render } from '@testing-library/react';
import { LocationData } from '../lib/types';

describe('HeartButton', () => {
    it('should render correctly', () => {
        const { container } = render(
            <HeartButton
                location={{
                    representasjonspunkt: {
                        nord: 0,
                        øst: 0,
                    },
                    stedsnavn: [],
                    stedsnummer: '',
                    navneobjekttype: undefined,
                    kommuner: undefined,
                }}
            />,
        );
        expect(container).toMatchSnapshot();
    });

    it('should render correctly with favorite from localstorage', () => {
        const location = {
            representasjonspunkt: {
                nord: 0,
                øst: 0,
            },
            stedsnavn: [{ skrivemåte: 'Test' }],
            stedsnummer: '',
            navneobjekttype: undefined,
            kommuner: undefined,
        } as LocationData;
        const localStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            clear: vi.fn(),
        };
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
        });

        localStorageMock.getItem.mockReturnValueOnce(
            JSON.stringify([location]),
        );

        const { container } = render(<HeartButton location={location} />);
        expect(container).toMatchSnapshot();
    });
});
