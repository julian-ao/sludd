import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';
import Popup from './Popup';

afterEach(() => {
    cleanup();
});

describe('Popup', () => {
    it('should render correctly', () => {
        const { container } = render(<Popup
            text="test"
            show={true}
        />);
        expect(container).toMatchSnapshot();
    });
});
