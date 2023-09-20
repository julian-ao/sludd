import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import FilterSkeleton from './FilterSkeleton'

afterEach(() => {
    cleanup()
})
describe('FilterSkeleton', () => {
    it('should render correctly', () => {
        const { container } = render(<FilterSkeleton
            title={'Filter'}
            values={['Adressenavn', 'By', 'Bydel', 'Gard', 'Forretningsbygg', 'Bruk', 'Tjern', 'Skole']}
            currentFilters={['Adressenavn', 'By', 'Bydel', 'Gard', 'Forretningsbygg', 'Bruk', 'Tjern', 'Skole']}
            setFilters={() => { }}
        />)
        expect(container).toMatchSnapshot()
    }),
        it('should render correctly with no current filters', () => {
            const { container } = render(<FilterSkeleton
                title={'Filter'}
                values={['Adressenavn', 'By', 'Bydel', 'Gard', 'Forretningsbygg', 'Bruk', 'Tjern', 'Skole']}
                currentFilters={[]}
                setFilters={() => { }}
            />)
            expect(container).toMatchSnapshot()
        }
        )
})