import { render } from '@testing-library/react';

import AboutComponent from './about-component';

describe('AboutComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AboutComponent />);
    expect(baseElement).toBeTruthy();
  });
});
