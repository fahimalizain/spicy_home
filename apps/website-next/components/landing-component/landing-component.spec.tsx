import { render } from '@testing-library/react';

import LandingComponent from './landing-component';

describe('LandingComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingComponent />);
    expect(baseElement).toBeTruthy();
  });
});
