import { render } from '@testing-library/react';

import StatsComponent from './stats-component';

describe('StatsComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StatsComponent />);
    expect(baseElement).toBeTruthy();
  });
});
