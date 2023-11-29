import { render } from '@testing-library/react';
import WeatherIcon from '../components/atoms/icons/WeatherIcon';

describe('WeatherIcon', () => {
    it('should render', () => {
        const { container } = render(
            <WeatherIcon symbol_code="clearsky_day" />,
        );
        expect(container).toMatchSnapshot();
    });
    it('should change size', () => {
        const { container } = render(
            <WeatherIcon symbol_code="heavysnow" size={50} />,
        );
        expect(container).toMatchSnapshot();
    });
});
