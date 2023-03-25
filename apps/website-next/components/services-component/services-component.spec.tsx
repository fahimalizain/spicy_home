import { render } from '@testing-library/react';

import ServicesComponent from './services-component';

describe('ServicesComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ServicesComponent />);
    expect(baseElement).toBeTruthy();
  });
});
