import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach } from 'vitest';
import FilterSkeleton from '../components/molecules/filterSkeleton/FilterSkeleton';

afterEach(() => {
    cleanup();
});
describe('FilterSkeleton', () => {
    it('should render correctly', () => {
        const { container } = render(
            <FilterSkeleton
                title={'Filter'}
                values={[
                    'Adressenavn',
                    'By',
                    'Bydel',
                    'Gard',
                    'Forretningsbygg',
                    'Bruk',
                    'Tjern',
                    'Skole',
                ]}
                currentFilters={[
                    'Adressenavn',
                    'By',
                    'Bydel',
                    'Gard',
                    'Forretningsbygg',
                    'Bruk',
                    'Tjern',
                    'Skole',
                ]}
                setFilters={() => {}}
            />,
        );
        expect(container).toMatchSnapshot();
    }),
        it('should render correctly with no current filters', () => {
            const { container } = render(
                <FilterSkeleton
                    title={'Filter'}
                    values={[
                        'Adressenavn',
                        'By',
                        'Bydel',
                        'Gard',
                        'Forretningsbygg',
                        'Bruk',
                        'Tjern',
                        'Skole',
                    ]}
                    currentFilters={[]}
                    setFilters={() => {}}
                />,
            );
            expect(container).toMatchSnapshot();
        });
    test('Check that the filter dropdown is visible after click', async () => {
        const user = userEvent.setup();

        render(
            <FilterSkeleton
                title={'Filter'}
                values={[
                    'Adressenavn',
                    'By',
                    'Bydel',
                    'Gard',
                    'Forretningsbygg',
                    'Bruk',
                    'Tjern',
                    'Skole',
                ]}
                currentFilters={[
                    'Adressenavn',
                    'By',
                    'Bydel',
                    'Gard',
                    'Forretningsbygg',
                    'Bruk',
                    'Tjern',
                    'Skole',
                ]}
                setFilters={() => {}}
            />,
        );

        await user.click(
            screen.getByRole('filter_box', { name: /click me!/i }),
        );

        expect(
            getComputedStyle(screen.getByRole('filter_values_container'))
                .visibility,
        ).toBe('visible');
    });
});
